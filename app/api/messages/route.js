import connectDB from '@/config/database';
import Message from '@/models/Message';
import sessionUser from '@/utils/sessionUser';

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        await connectDB();

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = sU;

        const readMessages = await Message.find({ recipient: userId, read: true })
            .sort({ createdAt: -1 })
            .populate('sender', 'username')
            .populate('property', 'name');

        const unreadMessages = await Message.find({
            recipient: userId,
            read: false,
        })
            .sort({ createdAt: -1 })
            .populate('sender', 'username')
            .populate('property', 'name');

        const messages = [...unreadMessages, ...readMessages];

        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};

// POST /api/messages
export const POST = async (request) => {
    try {
        await connectDB();

        const { name, email, phone, message, property, recipient } =
            await request.json();

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const user = sU;

        if (user.id === recipient) {
            return new Response(
                JSON.stringify({ message: 'Can not send a message to yourself.' }),
                { status: 400 }
            );
        }

        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message,
        });

        await newMessage.save();

        return new Response(JSON.stringify({ message: 'Message Sent' }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
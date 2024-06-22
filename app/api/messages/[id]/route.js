import connectDB from '@/config/database';
import Message from '@/models/Message';
import sessionUser from '@/utils/sessionUser';

export const dynamic = 'force-dynamic';

export const PUT = async (request, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = sU;

        const message = await Message.findById(id);

        if (!message) return new Response('Message Not Found', { status: 404 });

        // Verify ownership
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }
        message.read = !message.read;

        await message.save();

        return new Response(JSON.stringify(message), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = sU;

        const message = await Message.findById(id);

        if (!message) return new Response('Message Not Found', { status: 404 });

        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        await message.deleteOne();

        return new Response('Message Deleted', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
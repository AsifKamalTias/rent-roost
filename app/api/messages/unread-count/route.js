import connectDB from '@/config/database';
import Message from '@/models/Message';
import sessionUser from '@/utils/sessionUser';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {
        await connectDB();

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = sU;

        const count = await Message.countDocuments({
            recipient: userId,
            read: false,
        });

        return new Response(JSON.stringify(count), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
import connectDB from '@/config/database';
import User from '@/models/User';
import sessionUser from '@/utils/sessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
    try {
        await connectDB();

        const { propertyId } = await request.json();

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = sU;

        const user = await User.findOne({ _id: userId });

        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({ isBookmarked }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
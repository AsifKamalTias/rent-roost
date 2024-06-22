import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import sessionUser from "@/utils/sessionUser";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        await connectDB();

        const sU = await sessionUser();

        if (!sU) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }

        const { id: userId } = sU;

        const user = await User.findOne({ _id: userId });

        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

        return new Response(JSON.stringify(bookmarks), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};

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

        let message;

        if (isBookmarked) {
            user.bookmarks.pull(propertyId);
            message = 'Bookmark removed.';
            isBookmarked = false;
        } else {
            user.bookmarks.push(propertyId);
            message = 'Bookmark added.';
            isBookmarked = true;
        }

        await user.save();

        return new Response(JSON.stringify({ message, isBookmarked }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
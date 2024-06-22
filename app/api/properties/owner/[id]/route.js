import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const properties = await Property.find({ owner: params.id }).sort({ updatedAt: -1 });
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response({
            status: "fail",
            message: "Something went wrong"
        }, { status: 500 });
    }
}
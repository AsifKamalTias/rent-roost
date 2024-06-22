import connectDB from "@/config/database";
import Property from "@/models/Property";
import sessionUser from "@/utils/sessionUser";
import uploadImage from "@/utils/uploadImage";

export const GET = async (request) => {
    try {
        await connectDB();
        const properties = await Property.find({}).sort({ updatedAt: -1 });
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response({
            status: "fail",
            message: "Something went wrong"
        }, { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        await connectDB();

        const user = await sessionUser();

        if (!user) {
            return new Response({ status: "fail", message: "Unauthorized" }, { status: 401 });
        }
        const formData = await request.formData();

        const amenities = formData.getAll('amenities');

        const images = formData
            .getAll('images')
            .filter((image) => image.name !== '');

        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly.'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: user.id,
        };

        const imageUploadPromises = images.map(image => uploadImage(image));
        const uploadedImages = await Promise.all(imageUploadPromises);
        propertyData.images = uploadedImages;

        const newProperty = await Property(propertyData);
        newProperty.save();

        return Response.redirect(`${process.env.BASE_URL}/properties/${newProperty._id}`);


    } catch (e) {
        console.error(e);
        return new Response({
            status: "fail",
            message: "Something went wrong"
        }, { status: 500 });
    }
}
import connectDB from "@/config/database";
import Property from "@/models/Property";
import sessionUser from "@/utils/sessionUser";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const property = await Property.findById(params.id);

        if (!property) {
            return new Response(JSON.stringify({ message: "Property not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(property), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response({
            status: "fail",
            message: "Something went wrong"
        }, { status: 500 });
    }
}

export const PUT = async (request, { params }) => {
    try {
        await connectDB();

        const user = await sessionUser();
        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const { id } = params;

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');


        const existingProperty = await Property.findById(id);

        if (!existingProperty) {
            return new Response('Property does not exist', { status: 404 });
        }

        if (existingProperty.owner.toString() !== user.id) {
            return new Response('Unauthorized', { status: 401 });
        }

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

        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

        return new Response(JSON.stringify(updatedProperty), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to add property', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectDB();

        const user = await sessionUser();
        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const property = await Property.findById(params.id);

        if (!property) {
            return new Response(JSON.stringify({ message: "Property not found" }), { status: 404 });
        }

        if ((property.owner).toString() != user.id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        await property.deleteOne();

        return new Response(JSON.stringify({ message: "Property deleted" }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response({
            status: "fail",
            message: "Something went wrong"
        }, { status: 500 });
    }
}
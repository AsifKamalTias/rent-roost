import cloudinary from "@/config/cloudinary";

const uploadImage = async (image) => {
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
            folder: 'propertypulse',
        }
    );

    return result.secure_url;
};

export default uploadImage;
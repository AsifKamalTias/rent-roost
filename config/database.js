import mongoose from "mongoose";

let connected = false;
const connectDB = async () => {
    if (connected) {
        console.log("MongoDB is connected!");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        console.log("MongoDB is connected!");
    } catch (e) {
        console.error(e);
    }
}

export default connectDB;
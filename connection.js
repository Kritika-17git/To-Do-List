import mongoose from "mongoose";
async function mongodbConnect(uri) {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}
export default mongodbConnect;

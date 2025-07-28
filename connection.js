import mongoose from "mongoose"
async function mongodbConnect(URI) {
    return mongoose.connect(URI)
    .then(()=>{
        console.log("Server connected");
    })
}
export default mongodbConnect;
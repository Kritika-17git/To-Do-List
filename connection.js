import mongoose from "mongoose"
async function mongodbConnect(URI) {
    return mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) 
    .then(()=>{
        console.log("Server connected");
    })
}
export default mongodbConnect;
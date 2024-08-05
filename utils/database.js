import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("MongoDB is already connected");
        return
    }

    try {
        const uri = `mongodb+srv://testinglaravel31:Testing_Team%40123@cluster0.mvaeabd.mongodb.net/kalvin_ai`;
        await mongoose.connect(uri,{
            dbName: 'kalvin_ai',
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected = true
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error)
    }

}
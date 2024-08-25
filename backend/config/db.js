import mongoose from "mongoose";

export const connectDB =  async () => {
    await mongoose.connect('mongodb+srv://tamamabir:w8w98fPsnAzdiBAZ@cluster0.nibcb.mongodb.net/').then(()=>{
        console.log("DB Connected")
    });
}
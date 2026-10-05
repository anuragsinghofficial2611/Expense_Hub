import mongoose from 'mongoose';

const connectDB = async () => {
    try{ 
        await mongoose.connect('db url');
        console.log('db connected')
    } catch(error){
        console.log(error);
    }
}

export default connectDB();
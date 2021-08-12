import mongoose from 'mongoose'

const ConnectDB = async () => {
  try {
    const  conn = await mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex :true})

    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error : ${e.message}`);
    process.exit(1);

  }
}

export default ConnectDB;

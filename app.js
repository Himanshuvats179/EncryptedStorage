require('dotenv').config();
const express=require('express');
const app=express();
const connectDB=require('./db/connect');

const authRouter=require('./routes/auth');
const fileUpload=require('express-fileupload')
const cloudinary=require('cloudinary').v2
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})

app.use(express.static('./public'))
app.use(express.json());
app.use(fileUpload({useTempFiles:true}));

app.use('/api/v1/users',authRouter);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
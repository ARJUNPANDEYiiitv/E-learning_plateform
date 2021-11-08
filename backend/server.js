import express from 'express';
import mongoose  from 'mongoose';
import multer from 'multer';
import Video from './model/vdomodel.js';
import Course from './model/courseModel.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
import userRouter from './routers/userRouter.js';
import socket from 'socket.io';
import courseRouter from './routers/courseRouter.js';
const app=express();
const __dirname = path.resolve();
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
});
 app.use(express.urlencoded({ extended: true }));
 app.use('/api/users', userRouter);
 app.use('/api/courses', courseRouter);
app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );
// app.get('/',(req,res)=>{
//     res.send("server is created ");
// });
var storage =multer.diskStorage({
    destination:function (req,file,cb){
      cb(null,'frontend/public')
    },
    filename:(req,file,cb)=>{
      if(file.fieldname==="thumbnail"){
          cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      }
      else if(file.fieldname==="Notes"){
        cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
    else if(file.fieldname==="video"){
      cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  }
});
const upload =multer({
 storage:storage,
 limits : {fileSize : 100000000},
 fileFilter(req, file, cb) {
   if(file.fieldname==="thumbnail"){
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 

   
    // upload only png,jpeg and jpg format
     return cb(new Error('Please upload a Image'))
   }
 cb(undefined, true)
}
else if(file.fieldname==="Notes"){
  if (!file.originalname.match(/\.(pdf)$/)) { 

   
     return cb(new Error('Please upload a Image'))
   }
 cb(undefined, true)
}
else if(file.fieldname==="video"){
  if (!file.originalname.match(/\.(mp4|mkv|3gp)$/)) { 
    // upload only mp4 or mkv or 3gp format
     return cb(new Error('Please upload a video'))
   }
 cb(undefined, true)
}}
});
app.post('/courseupload',upload.single('thumbnail'),async(req,res)=>
{
  try{
    const CourseModel=new Course({
      CourseName:req.body.CourseName,
      CourseCode:req.body.CourseCode,
      thumbnail:`/${req.file.filename}`,
    })
    const uploadCourse = await CourseModel.save();
    res.status(200).send({message: 'Course Uploaded.', course: uploadCourse});
  }
  catch(error){
    res.status(404).send({message:'Product Upload Failed.'});
    } 
});

app.post('/lectureupload',upload.fields([{
  name: 'thumbnail', maxCount: 1
}, {
  name: 'video', maxCount: 1
},{
  name:'Notes',maxCount:1
}]),async(req,res,next)=>{
  try{
    
    const uploadModel= new Video({
      LectureTopic:req.body.LectureTopic,
      CourseCode:req.body.CourseCode,
       thumbnail:`/${req.files.thumbnail[0].filename}`,
       video:`/${req.files.video[0].filename}`,
       Notes:`/${req.files.Notes[0].filename}`,
      });
     
      const uploadLecture = await uploadModel.save();
      console.log("abhi");
      res.status(200).send({message: 'Lecture Uploaded.', lecture: uploadLecture});

  }catch(error){
      res.status(404).send({message: 'Lecture Upload Failed.'});
  }
});
app.get('/courses',expressAsyncHandler(async (req, res) => {
    const CourseName = req.query.name || '';
    const nameFilter = CourseName ? { CourseName: { $regex: CourseName, $options: 'i' } } : {};
    const courses= await Course.find({...nameFilter}).populate();
    //console.log(vdo);
    res.send(courses);
  }))
  app.get('/lecturelist/:id',expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const lectures= await Video.find({CourseCode:req.params.id});
    console.log(lectures);
    res.send(lectures);
  }))

  app.get(
    '/video_player/:id',
    expressAsyncHandler(async (req, res) => {
      const video = await Video.findById(req.params.id);
      if (video) {
        res.send(video);
      } else {
        res.status(404).send({ message: 'Video Not Found' });
      }
    })
  );

const port=process.env.PORT||5000;
app.get('/',(req,res)=>{
  res.send("server is created");
})
const server=app.listen(port,"0.0.0.0",()=>{
    console.log(`Serve at http://localhost:${port}`);
})

//socket.io
const io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

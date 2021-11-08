import mongoose from 'mongoose';

const vdoSchema=new mongoose.Schema(
    {
        LectureTopic:{type:String,required:true},
        CourseCode:{type:String,required:true},
        thumbnail:{type:String,required:true},
         video:{type:String,required:true},
         Notes:{type:String},
    },
    {
        timestamps:true
    }
);
const Video=mongoose.model('video',vdoSchema);
export default Video;

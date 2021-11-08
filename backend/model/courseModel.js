import mongoose from 'mongoose';

const CourseSchema=new mongoose.Schema(
    {
        CourseName:{type:String,required:true },
        CourseCode:{type:String,required:true,unique:true},
        thumbnail:{type:String,required:true},
    },
    {
        timestamps:true
    }
);
const Course=mongoose.model('Course',CourseSchema);
export default Course;

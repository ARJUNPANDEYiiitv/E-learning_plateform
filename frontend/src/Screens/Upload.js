import React, { useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { uploadCourse } from '../Actions/courseActions';
import {ProgressBar} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';


export default function Upload(props){
    const [CourseName,setCourseName]=useState('');
    const [CourseCode,setCourseCode]=useState('');
    const [thumbnail,setThumbnail]=useState([]);
    const [progress, setProgress] = useState();
    const courseUpload = useSelector((state) => state.courseUpload);
    const { loading, error, success} = courseUpload;
    const dispatch = useDispatch();

    const submitHandler =(e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('CourseName',CourseName);
        bodyFormData.append('CourseCode',CourseCode);
        bodyFormData.append('thumbnail', thumbnail);
        const onUploadProgress= data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          }
        dispatch(uploadCourse(bodyFormData,onUploadProgress));
      };

    return(
        <div className = "form-content">
            <form  onSubmit={submitHandler}>
                <div className="form">
                <div>
                  <h1> Add Course </h1>
                  {loading && <LoadingBox/>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  {success && <MessageBox variant="success">Course Uploaded Successfully.</MessageBox>}
                 <label htmlFor="CourseName">Course Name</label>
                 <input
                  type="text"
                  id="CourseName"
                  name='CourseName'
                  placeholder="Enter Movie Name"
                  required
                  onChange={(e) => setCourseName(e.target.value)}>

                  </input>
             </div>
             <div>
                 <label htmlFor="CourseCode">Course Code</label>
                 <input
                  type="number"
                  id="CourseCode"
                  name='CourseCode'
                  placeholder="enter unique CourseCode in number"
                  required
                  onChange={(e) => setCourseCode(e.target.value)}>

                  </input>
             </div>
             <div>
                 <label htmlFor="thumbnail">Course Thumbnail</label>
                 <input
                  type="file"
                  id="thumbnail"
                  name='thumbnail'
                  placeholder="Enter thumbnail"
                  required
                  onChange={(e)=>{
                    setThumbnail(e.target.files[0])
                }}>
                  </input>
             </div>
             </div>
             <div className="progress"> 
             <div className="up-button">
                 <button type="submit">Save</button>
                 </div> 
                 <div>
                    <span>Uploading Status : </span>
                 {progress && <ProgressBar now={progress} label={`${progress}%`} />}
                 </div>
             </div>
            </form>
        </div>
    )
}

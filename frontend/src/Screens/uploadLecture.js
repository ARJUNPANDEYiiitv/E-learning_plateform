import React, { useState } from 'react';
import {ProgressBar} from 'react-bootstrap'
import { uploadLecture } from '../Actions/lectureActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Upload(props){
    const [LectureTopic,setLectureTopic]=useState('');
    const [CourseCode,setCourseCode]=useState('');
    const [thumbnail,setThumbnail]=useState([]);
    const [video,setVideo]=useState([]);
    const [progress, setProgress] = useState();
    const[Notes,setNotes]=useState([]);
    const dispatch = useDispatch();
    const lectureUpload = useSelector((state) => state.lectureUpload);
    const { loading, error, success} = lectureUpload;
    const submitHandler =(e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('LectureTopic',LectureTopic);
        bodyFormData.append('CourseCode',CourseCode);
        bodyFormData.append('thumbnail', thumbnail);
        bodyFormData.append('video',video);
        bodyFormData.append('Notes',Notes);
        const onUploadProgress= data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          }
        dispatch(uploadLecture(bodyFormData,onUploadProgress));
      };

    return(
        <div className = "form-content">
            <form  onSubmit={submitHandler}>
                <div className="form">
                <div>
                 <h2> Add Lecture </h2>
                  {loading && <LoadingBox/>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  {success && <MessageBox variant="success">Lecture Uploaded Successfully.</MessageBox>} 
                 <label htmlFor="LectureTopic">Lecture Topic</label>
                 <input
                  type="text"
                  id="LectureTopic"
                  name='LectureTopic'
                  placeholder="Enter Lecture topic"
                  required
                  onChange={(e) => setLectureTopic(e.target.value)}>

                  </input>
             </div>
             <div>
                 <label htmlFor="CourseCode">Course Code</label>
                 <input
                  type="number"
                  id="CourseCode"
                  name='CourseCode'
                  placeholder="CourseCode"
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
              { <div>
                 <label htmlFor="video"> Video Lecture </label>
                 <input
                  type="file"
                  id="video"
                  name='video'
                  placeholder="Upload Video"
                  required
                  onChange={(e)=>{
                      setVideo(e.target.files[0])
                  }}>
                  </input>
             </div>  }
             { <div>
                 <label htmlFor="Notes"> Lecture Notes</label>
                 <input
                  type="file"
                  id="Notes"
                  name='Notes'
                  placeholder="Upload Notes"
                  required
                  onChange={(e)=>{
                      setNotes(e.target.files[0])
                  }}>
                  </input>
             </div>  }
             </div>
             <div className="progress"> 
             <div>
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

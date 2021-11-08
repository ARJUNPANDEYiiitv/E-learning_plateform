import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
export default function LectureList(props){
    const code=props.match.params.id;
    console.log(code);
    const [video,setVideo]=useState([]);
    useEffect(() => {
        const fetchData=async()=>{
            try {
                const {data}= await Axios.get(`/lecturelist/${code}`);
                console.log(data);
                setVideo(data);
               } catch ( err) {
                   alert("error occur")
               }
        }
        fetchData();

        
    }, [code]);


    return (
        <div className = "video-container">
             <h1>Lecture List</h1>
          {
              video.map((video) =>
                 <div key={video._id} className="video-card">
                     <Link to={'/video_player/'+video._id}>
                         <img className="medium" src={video.thumbnail} alt='video thumbnail'/>
                     </Link> 
                     <div className="video-card-body">
                       <Link to={'/video_player/'+video._id}>
                           <h3>Lecture Topic: {video.LectureTopic}</h3>
                        </Link>
                        <div>
                        <h3>Course code: {video.CourseCode}</h3>
                        </div>
                        { <div>
                            <Link to={'/pdfviewer'}>
                            <h3>Lecture Notes: {video.Notes}</h3>
                            </Link>
                        
                        </div> }

                        
                     </div>
                 </div>
              )
          }
        </div>
    );
}
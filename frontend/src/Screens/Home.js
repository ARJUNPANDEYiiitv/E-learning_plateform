import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
export default function Home(props){
    const [Courses,setCourses]=useState([]);
    useEffect(() => {
        const fetchData=async()=>{
            try {
                const {data}= await Axios.get('/courses');
               //  console.log(data);
                setCourses(data);
               } catch ( err) {
                   alert("Error Occur")
               }
        }
        fetchData();
    }, []);


    return (<>
       <div>
</div>
        <div className = "container">
          {
              Courses.map((course) =>
                 <div key={course._id} className="card">
                     <Link to={`/lecturelist/${course.CourseCode}`}>
                         <img className="medium" src={course.thumbnail} alt='course thumbnail'/>
                     </Link> 
                     <div className="card-body">
                       <Link to={`/lecturelist/${course.CourseCode}`}>
                           <h3>Course Name: {course.CourseName}</h3>
                           <h3>Course code: {course.CourseCode}</h3>
                       </Link>
                     </div>
                 </div>
              )
          }
        </div>
  </>  );
}
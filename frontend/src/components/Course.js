import React from 'react';
import { Link } from 'react-router-dom';

export default function Course(props) {
  const { course } = props;
  return (
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
  );
}
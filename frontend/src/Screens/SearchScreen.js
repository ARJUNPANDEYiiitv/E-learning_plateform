import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listCourses } from '../Actions/courseActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Course from '../components/Course';

export default function SearchScreen(props) {
  const { name = 'all' } = useParams();
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;
  useEffect(() => {
    dispatch(listCourses({ name: name !== 'all' ? name : '' }));
  }, [dispatch, name]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{courses.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {courses.length === 0 && (
                <MessageBox>No Course Found</MessageBox>
              )}
              <div className="row center">
                {courses.map((course) => (
                  <Course key={course._id} course={course}></Course>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
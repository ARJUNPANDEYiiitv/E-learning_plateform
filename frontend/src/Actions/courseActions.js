import { COURSE_DETAILS_FAIL,
   COURSE_DETAILS_REQUEST,
   COURSE_DETAILS_SUCCESS,
  COURSE_LIST_FAIL,
   COURSE_LIST_REQUEST,
   COURSE_LIST_SUCCESS, 
   COURSE_UPLOAD_FAIL, 
   COURSE_UPLOAD_REQUEST, 
   COURSE_UPLOAD_SUCCESS} from "../constants/courseConstants"
import Axios from 'axios';

export const listCourses=({ name = '' })=>async(dispatch)=>{

    dispatch({type:COURSE_LIST_REQUEST});
    try {
        const {data} =await Axios.get(`/courses?name=${name}`);
        dispatch({type:COURSE_LIST_SUCCESS,payload:data});

    } catch (error) {
        dispatch({type:COURSE_LIST_FAIL,payload:error.message});
    }
}
 
export const detailsProduct = (courseId) => async (dispatch) => {
    dispatch({ type: COURSE_DETAILS_REQUEST, payload: courseId });
    try {
      const { data } = await Axios.get(`/api/courses/${courseId}`);
      dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: COURSE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const uploadCourse = (course,uploadProgress) => async (dispatch, getState) => {
    dispatch({ type: COURSE_UPLOAD_REQUEST});
    const {userSignin: {userInfo} } = getState();
    try {
      const { data } = await Axios.post('/courseupload', course,
      {
        'content-type':'multipart/form-data',
        headers: { Authorization: `Bearer ${userInfo.token}` },
        onUploadProgress: uploadProgress,
        });
      dispatch({ type: COURSE_UPLOAD_SUCCESS, payload: data.course });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COURSE_UPLOAD_FAIL, payload: message });
    }
  };
  
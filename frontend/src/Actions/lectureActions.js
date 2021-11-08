import Axios from 'axios';
import { LECTURE_UPLOAD_FAIL, LECTURE_UPLOAD_REQUEST, LECTURE_UPLOAD_SUCCESS } from '../constants/lectureConstants';
export const uploadLecture = (lecture,uploadProgress) => async (dispatch, getState) => {
    dispatch({ type: LECTURE_UPLOAD_REQUEST});
    const {userSignin: {userInfo} } = getState();
    try {
      const { data } = await Axios.post('/lectureupload', lecture,
      {
        'content-type':'multipart/form-data',
        headers: { Authorization: `Bearer ${userInfo.token}` },
        onUploadProgress: uploadProgress,
        });
      dispatch({ type: LECTURE_UPLOAD_SUCCESS, payload: data.lecture });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LECTURE_UPLOAD_FAIL, payload: message });
    }
  };
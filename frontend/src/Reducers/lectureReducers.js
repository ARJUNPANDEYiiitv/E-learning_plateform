import { LECTURE_UPLOAD_FAIL, LECTURE_UPLOAD_REQUEST, LECTURE_UPLOAD_SUCCESS } from "../constants/lectureConstants";

export const lectureUploadReducer = ( state = {lecture:{}}, action) => {
    switch (action.type) {
      case LECTURE_UPLOAD_REQUEST:
        return { loading: true };
      case LECTURE_UPLOAD_SUCCESS:
        return{
          loading:false ,success: true, lecture: action.payload}
      case LECTURE_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
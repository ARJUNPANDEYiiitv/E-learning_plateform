import thunk from 'redux-thunk';
import {compose,createStore,applyMiddleware, combineReducers} from 'redux';
import {
  userRegisterReducer,
  userDetailsReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from './Reducers/userReducers';
import { courseDetailsReducer, courseListReducer, courseUploadReducer } from './Reducers/courseReducers';
import { lectureUploadReducer } from './Reducers/lectureReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    }
  };
const reducer= combineReducers({
    courseList:courseListReducer,
    courseDetails:courseDetailsReducer,
    courseUpload:courseUploadReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    lectureUpload: lectureUploadReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,initialState ,composeEnhancer(applyMiddleware(thunk)));

export default store;
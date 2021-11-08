import { BrowserRouter, Link, Route } from "react-router-dom";
import Upload from "./Screens/Upload";
import Home from './Screens/Home';
import videoPlayer from './Screens/VideoPlayer';
import SigninScreen from './Screens/SigninScreen';
import EventCalendar from './Screens/EventCalendar';
import LectureList from './Screens/LectureList';
import uploadLecture from './Screens/uploadLecture';
import registerScreen from './Screens/registerScreen';
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./Actions/userActions";
import ProfileScreen from "./Screens/ProfileScreen";
import Notes from "./Screens/Notes";
import GroupChatting from "./Screens/GroupChatting";
import PrivateRoute from "./components/PrivateRoute";
import SearchScreen from "./Screens/SearchScreen";


function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
   <div className="app">
     <header className="head">
      <Link to='/'> <div> HOWTOKNOW</div></Link>
       <div className='nav-button'>
         <div className ="nav-button-block">
           <Link to="/calendar">Event-Calendar</Link>
         </div>
         <div className ="nav-button-block">
           <Link to="/discussion">Discuss</Link>
         </div>
         <div className ="nav-button-block">
         {
         userInfo&&userInfo.isAdmin?(
          <div className="dropdown">
          <Link to="#">
            Courses <i className="fa fa-caret-down"></i>{' '}
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/upload" >
                Add Courses
              </Link>
            </li>
            <li>
                <Link to="/lectureupload">Add Lectures</Link>
              </li>
              
          </ul>
          </div>
        ) 
         :("")
        }
         </div>
         <div className ="nav-button-block">
         {userInfo ? (
              <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  
              </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

         </div>
       </div>
     </header>
     <main className="main">
       <Route path="/" component={Home} exact={true}/>
       <Route path="/upload" component={Upload}/>
       <Route path='/video_player/:id' component={videoPlayer}/>
       <Route path='/signin' component={SigninScreen}/>
       <Route path='/register' component={registerScreen}/>
       <Route path='/lectureupload' component={uploadLecture}/>
       <Route path='/lecturelist/:id' component={LectureList}/>
       <Route path='/pdfviewer' component={Notes}/>
       <Route path="/calendar" component={EventCalendar}/>
       <Route path="/discussion" component={GroupChatting}/> 

       <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
       <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
        ></Route>
       
       

     </main>
     <footer className="foot">
       All copyrights reserved.
     </footer>
   </div></BrowserRouter>
  );
}

export default App;
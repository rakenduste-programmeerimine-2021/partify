import Header from './components/Header.js'
import Login from './components/Login.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { makeStyles } from '@mui/material'
import Register from './components/Register.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './components/Profile.js';
import PostView from './components/PostView.js';
import EditPost from './components/EditPost';
import AddPost from './components/AddPost.js';
import Settings from './components/Settings.js';
import Posts from './components/Posts.js';

const useStyles = makeStyles

//class app extends component
function App() {
  const classes = useStyles
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element = {<Posts/>} />
          <Route exact path='/login' element = {<Login/>} />
          <Route exact path='/register' element = {<Register/>} />
          <Route exact path='/profile' element = {<Profile/>} />
          <Route exact path='/viewpost' element = {<PostView/>} />
          <Route exact path='/editpost' element = {<EditPost/>} />
          <Route exact path='/addpost' element= {<AddPost/>} />
          <Route exact path='/settings' element= {<Settings/>} />
        </Routes>
      </BrowserRouter>
      <a style={{color:"white"}}>a</a>
    </div>
  );
}

export default App;

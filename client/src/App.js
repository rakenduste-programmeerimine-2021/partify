import Header from './components/Header.js'
import Login from './components/Login.js'
import Home from './pages/Home.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { makeStyles } from '@mui/material'
import Register from './components/Register.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './components/Profile.js';
import PostView from './components/PostView.js';

const useStyles = makeStyles

//class app extends component
function App() {
  const classes = useStyles
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element = {<Home/>} />
          <Route exact path='/login' element = {<Login/>} />
          <Route exact path='/register' element = {<Register/>} />
          <Route exact path='/profile' element = {<Profile/>} />
          <Route exact path='/viewpost' element = {<PostView/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

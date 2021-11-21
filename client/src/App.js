import Header from './components/Header.js'
import Login from './components/Login.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { makeStyles } from '@mui/material'
import Register from './components/Register.js';
const useStyles = makeStyles

function App() {
  const classes = useStyles
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/'></Route>
          <Route exact path='/login' element = {<Login/>} />
          <Route exact path='/register' element = {<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

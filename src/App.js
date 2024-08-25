import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from "react";

import './App.css';
import AddUser from './Pages/AddUser';
import Home from './Pages/Home';
import { clearUserErrors, getUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import store from './Store';
import UpdateUser from './Pages/UpdateUser';

function App() {
  const {error}=useSelector((state)=>state.users);
  React.useEffect(()=>{
    store.dispatch(getUser());
    if(error){
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      })
      store.dispatch(clearUserErrors());
    }
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route exact path="/adduser" element={<AddUser/>}/>
      <Route exact path="/updateuser/:id" element={<UpdateUser/>}/>
    </Routes>
      </BrowserRouter>
  );
}

export default App;

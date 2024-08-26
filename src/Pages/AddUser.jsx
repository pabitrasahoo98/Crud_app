import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import "./AddUser.css";
import { ADD_USER_RESET } from '../reducers/addUserReducer';
import { createUser,clearAUErrors } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import BoyIcon from '@mui/icons-material/Boy';
import Swal from 'sweetalert2';
import Header from './Header';


const AddUser = () => {

    const navigate=useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.addUser);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState('');
    const [age, setAge] = useState("");


    const createUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("mobileNo", mobileNo);
        myForm.set("age", age);

    
        
        dispatch(createUser(myForm))
        
      }
   

      useEffect(() => {
        if(error){
          Swal.fire({
            title: "Error",
            text: error,
            icon: "warning"
          })
          dispatch(clearAUErrors());
        }
        if(success){
          Swal.fire({
            title: "Success",
            text: "User added successfully",
            icon: "success"
          })
          dispatch(ADD_USER_RESET());
          navigate("/");
        }
        
      }, [error,success,dispatch,navigate])

     
      
  return (
    <>
<Header/>
<div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createUserSubmitHandler}
          >
            <h1>Add User</h1>

            <div>
              <FaceIcon />
              <input
                type="text"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <InstallMobileIcon/>
              <input
                type="text"
                placeholder="Enter Mobile No"
                required
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div>
              <BoyIcon/>
              <input
                type="number"
                placeholder="Enter Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              ADD
            </Button>
          </form>
        </div>
      
    
    
    </>
  )
}

export default AddUser
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import "./AddUser.css";
import {UPDATE_USER_RESET  } from '../reducers/manipulateUserReducer';
import { updateUser,clearUUErrors,getUserDetails,clearUserDetailsErrors } from '../actions/userAction';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import BoyIcon from '@mui/icons-material/Boy';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';


const UpdateUser = () => {

  const {id}=useParams();
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const { loading, error, isUpdate } = useSelector((state) => state.maniUser);
    const {loading:ploading, user,error:pError } = useSelector((state) => state.user);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState('');
    const [age, setAge] = useState("");


    useEffect(() => {

      if (user && user?._id !== id) {
          dispatch(getUserDetails(id));
        }else{
          setName(user.name);
          setEmail(user.email);
          setMobileNo(user.mobileNo);
          setAge(user.age);
         
      }
      if(pError){
        Swal.fire({
          title: "Error",
          text: pError,
          icon: "warning"
        })
          dispatch(clearUserDetailsErrors());
        }
      if(error){
        Swal.fire({
          title: "Error",
          text: error,
          icon: "warning"
        })
        dispatch(clearUUErrors());
      }
      if(isUpdate){
        Swal.fire({
          title: "Success",
          text: "User Updated successfuly",
          icon: "success"
        })
        dispatch(UPDATE_USER_RESET());
        navigate("/");
       // window.location.reload();
      }
      
    }, [user,error,isUpdate,dispatch,id,pError,navigate])


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("mobileNo", mobileNo);
        myForm.set("age", age);

    
        
        dispatch(updateUser(id,myForm))
        
      }

      if (loading) {
        return <Loader />;
      }
      if (ploading) {
        return <Loader />;
      }
      
      
      
  return (
    <>
    <Header/>

<div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

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
              UPDATE
            </Button>
          </form>
        </div>
      
    
    
    </>
  )
}

export default UpdateUser
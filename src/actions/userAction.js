import axios from "axios";
import { ALL_USER_FAIL, ALL_USER_REQUEST,ALL_USER_SUCCESS,CLEAR_UERRORS} from "../reducers/userReducer"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,CLEAR_UDERRORS} from "../reducers/userDetailsReducer"

import { ADD_USER_FAIL,ADD_USER_SUCCESS,ADD_USER_REQUEST,CLEAR_AUERRORS } from "../reducers/addUserReducer";
import { CLEAR_DUERRORS, CLEAR_UUERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../reducers/manipulateUserReducer";
 
//get all product
export const getUser = () =>
  async (dispatch) => {
    try {
      dispatch(ALL_USER_REQUEST());
      let link = `https://crud-server-silk.vercel.app/api/v1/users`;
  
      const { data } = await axios.get(link,{withCredentials:true});

      dispatch(ALL_USER_SUCCESS(data));
      
    } catch (error) {
      dispatch(ALL_USER_FAIL(error.response.data.message));
    }
  };

  //clear user Errors
export const clearUserErrors =() =>
    async (dispatch) => {
      dispatch( CLEAR_UERRORS());
    };


  //get user Details
export const getUserDetails =(id) =>
async (dispatch) => {
  try {
    dispatch(USER_DETAILS_REQUEST());

    let link = `https://crud-server-silk.vercel.app/api/v1/userid/${id}`;

    const { data } = await axios.get(link);

    dispatch(USER_DETAILS_SUCCESS(data));
    
  } catch (error) {
    dispatch(USER_DETAILS_FAIL(error.response.data.message));
  }
};

 //clear user Details Errors
 export const clearUserDetailsErrors =() =>
    async (dispatch) => {
      dispatch( CLEAR_UDERRORS());
    };


  //add user
export const createUser=(userData)=>async(dispatch)=>{

  try {
      dispatch(ADD_USER_REQUEST())
      const config={headers:{"Content-Type":"application/json"},withCredentials:true}
      const {data}=await axios.post(`https://crud-server-silk.vercel.app/api/v1/users/new`,userData,config);
      dispatch(ADD_USER_SUCCESS(data));
      
  } catch (error) {
  dispatch(ADD_USER_FAIL(error.response.data.message))
  }

}
//clear add User error
export const clearAUErrors =() =>
async (dispatch) => {
dispatch( CLEAR_AUERRORS());
};


  //delete User
  export const deleteUser=(id)=>async(dispatch)=>{

    try {
        dispatch(DELETE_USER_REQUEST())
        const config={headers:{"Content-Type":"application/json"},withCredentials:true}
        const {data}=await axios.delete(`https://crud-server-silk.vercel.app/api/v1/userid/${id}`,config);
        dispatch(DELETE_USER_SUCCESS(data));
        
    } catch (error) {
    dispatch(DELETE_USER_FAIL(error.response.data.message))
    }
  
  }
   //clear dELETE User error
   export const clearDUErrors =() =>
   async (dispatch) => {
   dispatch( CLEAR_DUERRORS());
   };
 

   //update User
   export const updateUser=(id,userData)=>async(dispatch)=>{

    try {
        dispatch(UPDATE_USER_REQUEST())
        const config={headers:{"Content-Type":"application/json"},withCredentials:true}
        const {data}=await axios.put(`https://crud-server-silk.vercel.app/api/v1/userid/${id}`,userData,config);
        dispatch(UPDATE_USER_SUCCESS(data.success));
        
    } catch (error) {
    dispatch(UPDATE_USER_FAIL(error.response.data.message))
    }
  
  }
 
   //clear update User error
   export const clearUUErrors =() =>
   async (dispatch) => {
   dispatch( CLEAR_UUERRORS());
 
   };
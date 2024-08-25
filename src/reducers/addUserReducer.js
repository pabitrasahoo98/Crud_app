import { createSlice } from "@reduxjs/toolkit";

export const addUserReducer = createSlice(
    { name:'AddUser',
       initialState:{
        Adduser:{},
        success:false,
        loading:false,
        error:null
       },
       reducers:{
        ADD_USER_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        ADD_USER_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            success:action.payload.success,
            Adduser:action.payload.user
            }
          },
        ADD_USER_RESET(state,action){
            return{
              ...state,
              success:false,
            }
           
          },
        ADD_USER_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
            }
          },
          CLEAR_AUERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          }
        }
    })
        export const {ADD_USER_FAIL,ADD_USER_REQUEST,ADD_USER_SUCCESS,ADD_USER_RESET,CLEAR_AUERRORS}=addUserReducer.actions
        export default addUserReducer.reducer
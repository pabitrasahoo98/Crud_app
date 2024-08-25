import { createSlice } from "@reduxjs/toolkit";

export const userDetailsReducer = createSlice(
    { name:'user',
       initialState:{
        user:{},
        loading:false,
        error:null
       },
       reducers:{
        USER_DETAILS_REQUEST:(state)=>{
            state.loading= true;
          },
        USER_DETAILS_SUCCESS:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload.user;
          },
        USER_DETAILS_FAIL:(state,action)=>{
            state.loading=false;
            state.product=null;
            state.error=action.payload;
          },
    
        CLEAR_UDERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,CLEAR_UDERRORS}=userDetailsReducer.actions
  export default userDetailsReducer.reducer
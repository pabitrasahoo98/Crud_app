import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice(
    { name:'products',
       initialState:{
        user:[],
        loading:false,
        error:null
       },
       reducers:{
        ALL_USER_REQUEST(state){
            state.loading= true;
            state.user=[];
            state.error=null;
          },
      
        ALL_USER_SUCCESS(state,action){
          state.loading=false;
          state.user=action.payload.user;
          },
        ALL_USER_FAIL(state,action){
            state.loading=false;
            state.error=action.payload;
          },
    
        CLEAR_UERRORS:(state)=>{
            state.error=null;
          }
       } 

    }
);
export const {ALL_USER_FAIL,ALL_USER_REQUEST,ALL_USER_SUCCESS,CLEAR_UERRORS}=userReducer.actions
export default userReducer.reducer


import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import {userDetailsReducer} from './reducers/userDetailsReducer';
import { addUserReducer } from './reducers/addUserReducer';
import {manipulateUserReducer} from './reducers/manipulateUserReducer';

const store=configureStore({
    reducer:{
        users:userReducer.reducer,
        user:userDetailsReducer.reducer,
        addUser:addUserReducer.reducer,
        maniUser:manipulateUserReducer.reducer,
       }
    

})
export default store;

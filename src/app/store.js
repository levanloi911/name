import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feattures/useSlice"
export default configureStore(
    {
        reducer:{
            user: userReducer
        }
    }
);
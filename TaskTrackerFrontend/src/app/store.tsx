import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/user/userSlice'
import projectReducer from '../features/project/createProjectSlice'


const store = configureStore({
    reducer:{
        auth:authReducer,
        project:projectReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


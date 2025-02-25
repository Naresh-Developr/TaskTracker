import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/user/userSlice'
import projectReducer from '../features/project/createProjectSlice'
import assignUsersReducer from '../features/user/assignUsersSlice'


const store = configureStore({
    reducer:{
        auth:authReducer,
        project:projectReducer,
        assignUser:assignUsersReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


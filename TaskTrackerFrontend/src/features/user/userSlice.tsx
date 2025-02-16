import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState{
    token: string | null;
    role: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    token:null,
    role:null,
    status:'idle',
    error:null
}

export const signUp = createAsyncThunk('auth/signup', async(user : {name:string,email:string,password:string}

) => {

    const response = await axios.post('http://localhost:5148/api/auth/signup', user);
    return response.data;
});

export const signIn = createAsyncThunk("auth/signin", async(signInRequest :{Email:string, password:string}
    
)=> {
        const response = await axios.post('http://localhost:5148/api/auth/signin',signInRequest);
        return response.data;
});

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state){
            state.token=null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(signUp.pending, (state) => {
            state.status='loading';
        })
        .addCase(signUp.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        .addCase(signUp.rejected, (state,action)=>{
            state.status = 'failed';
            state.error = action.error.message || "sign-up failed";
        })
        .addCase(signIn.pending, (state) =>{
            state.status='loading';
        })
        .addCase(signIn.fulfilled, (state,action) =>{
            state.status = 'succeeded';
            console.log(state);
            state.token = action.payload.token;
            state.role = action.payload.role;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
        })
        .addCase(signIn.rejected, (state,action)=>{
            state.status = 'failed';
            state.error = action.error.message || "sign-In-failed";
        });
    }


});


export const {logout} = authSlice.actions;

export default authSlice.reducer;


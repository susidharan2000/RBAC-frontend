import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loding:false
}
const UserSlice = createSlice({
    name:"user",
        initialState,
        reducers:{
            SignInStart:(state)=>{
                state.loding = true;
                state.error = null;
            },
            SignInSuccess:(state,action)=>{
                state.currentUser = action.payload;
                state.loding = false;
                state.error = null;
            },
            SignInFailure:(state,action)=>{
                state.error = action.payload;
                state.loding = false;
                state.currentUser = null;
            },
            UpadateStart:(state)=>{
                state.loding = true;
                state.error = null;
            },
            UpadateSuccess:(state,action)=>{
                state.loding = false;
                state.currentUser = action.payload;
                state.error = null;
            },
            UpdateFailure:(state,action)=>{
                state.loding = false;
                state.error = action.payload;
            },
            SignOutSuccess:(state)=>{
                state.loding = false;
                state.currentUser = null;
                state.error = null;
            },
        }
});

export const {SignInStart,SignInSuccess,SignInFailure,UpadateStart,UpadateSuccess,UpdateFailure,SignOutSuccess} = UserSlice.actions;

export  default UserSlice.reducer;
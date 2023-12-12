import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name:'users',
    initialState:{
        data:[]
    }, 
    reducers:{
        add: (state, action:{payload: []}) =>{
            state.data = action.payload
        },
    }
})

export const {add} = userReducer.actions;

export default userReducer.reducer;
import {createSlice} from "@reduxjs/toolkit"

const loginSlice = createSlice({
    name:"auth",
    initialState:{
        value:false
    },
    reducers:{
        onLogin:(state,action)=>{
            state.value=true
        },
        onLogout:(state,action)=>{
            state.value=false
        }
    }
})

export default loginSlice.reducer
export const {onLogin,onLogout} = loginSlice.actions
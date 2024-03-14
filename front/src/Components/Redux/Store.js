import {configureStore} from "@reduxjs/toolkit"
import MenuSlice from "./MenuSlice"
import Authentication from "./Authentication"

export const Store =configureStore({
    reducer:{
        menu:MenuSlice,
        auth:Authentication
    }
})
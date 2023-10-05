import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "../reducers/cartSlice/index"
import userSlice from "../reducers/userSlice/index";


const Store = configureStore({
    reducer:{
        user: userSlice,
        cart: cartSlice,
    }
})

export default Store;
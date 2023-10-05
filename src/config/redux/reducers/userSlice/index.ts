import { createSlice } from "@reduxjs/toolkit";

let initialState ={
    isLogin: false,
    id:1,
    userName:"abc",
    personalDetail:{},
}


export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        add: (state, action) => {
            state.isLogin = true;
            state.userName = action.payload.userName; 
            state.id = action.payload.id; 
            state.personalDetail = {...action.payload}
          },
        edit: () => {},

    }
})

export const { add, edit } = UserSlice.actions;
export default UserSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// let initialState ={
//     isLogin: false,
//     id:1,
//     userName:"abc",
//     personalDetail:{},
// }


// export const UserSlice = createSlice({
//     name:"user",
//     initialState,
//     reducers: {
//         add: (state , action) => {
//             state.isLogin = true;
//             state.personalDetail = {...action.payload}
//              console.log(action.payload)
//         },
//         edit: () => {},

//     }
// })

// export const { add, edit } = UserSlice.actions;
// export default UserSlice.reducer;
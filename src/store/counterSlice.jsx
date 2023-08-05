import { createSlice } from '@reduxjs/toolkit'





const initialState = {



    currentUser: {},
    darkMode: false,
    chat: []



}





export const counterSlice = createSlice({



    name: 'counter',

    initialState,


    reducers: {


        switchMode: (state, action) => {
            state.darkMode = !state.darkMode
        },

        login: (state, action) => {
            state.currentUser = action.payload
        },


        logout: (state, action) => {
            state.currentUser = {}
            state.chat = []
        },

        addToChat: (state, action) => {
            state.chat?.push(action.payload)
        },


        setChat: (state, action) => {
            state.chat = action.payload
        },








    },


})







export const { switchMode, login, logout, addToChat, setChat } = counterSlice.actions

export default counterSlice.reducer
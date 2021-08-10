import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IUserMessage
{
    name: string,
    message: string
}

interface IState {
    userName: string | null,
    login: boolean,
    workMessages: IUserMessage[],
    talkMessages: IUserMessage[]
}

let initialState : IState = {
    userName: localStorage.getItem('username'),
    login: localStorage.getItem('login') === 'true' ? true : false,
    workMessages: JSON.parse(localStorage.getItem("workMessages") as string) ? JSON.parse(localStorage.getItem("workMessages") as string) : [],
    talkMessages: JSON.parse(localStorage.getItem("talkMessages") as string) ? JSON.parse(localStorage.getItem("talkMessages") as string) : []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userName = action.payload;
            state.login = true;
            localStorage.setItem('username', state.userName as string);
            localStorage.setItem('login', 'true');
        },
        addWorkMessage: (state, action) => {
            state.workMessages = [...state.workMessages, action.payload];
        },
        addTalkMessage: (state, action) => {
            state.talkMessages = [...state.talkMessages, action.payload];
        }
    },
});

export const { addWorkMessage, addTalkMessage, login } = chatSlice.actions;
export const selectWorkMessages = (state: RootState) => state.messages.workMessages;
export const selectTalkMessages = (state: RootState) => state.messages.talkMessages;
export const selectLoginStatus = (state: RootState) => state.messages.login;
export const selectUsername = (state: RootState) => state.messages.userName;
export default chatSlice.reducer;
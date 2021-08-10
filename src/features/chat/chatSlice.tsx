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
        },
        deleteTalkMessage: (state, action) => {
            const index = action.payload;
            state.talkMessages.splice(index, 1);
            localStorage.setItem('talkMessages', JSON.stringify(state.talkMessages));
        },
        deleteWorkMessage: (state, action) => {
            const index = action.payload;
            state.workMessages.splice(index, 1);
            localStorage.setItem('talkMessages', JSON.stringify(state.talkMessages));
        },
        changeTalkMessage: (state, action) => {
            const index = action.payload.index;
            const message = action.payload.message;
            state.talkMessages[index].message = message;
        },
        changeWorkMessage: (state, action) => {
            const index = action.payload.index;
            const message = action.payload.message;
            state.workMessages[index].message = message;
        }
    },
});

export const { addWorkMessage,
    addTalkMessage, 
    login, 
    deleteTalkMessage, 
    deleteWorkMessage,
    changeTalkMessage,
    changeWorkMessage} = chatSlice.actions;
export const selectWorkMessages = (state: RootState) => state.messages.workMessages;
export const selectTalkMessages = (state: RootState) => state.messages.talkMessages;
export const selectLoginStatus = (state: RootState) => state.messages.login;
export const selectUsername = (state: RootState) => state.messages.userName;
export default chatSlice.reducer;
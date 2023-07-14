import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
    
    createChannelBtnToggled: boolean;
    privateToggled: boolean;
    showContactListToggled: boolean;
   
}

const initialState: ToggleState = {
    
    createChannelBtnToggled: false,
    privateToggled: false,
    showContactListToggled: false,
   
};

const toggleCreateChannelSlice = createSlice({
    name: 'toggleCreateChannel',
    initialState,
    reducers: {
        createChannelOn: (state) => {
            state.createChannelBtnToggled = !state.createChannelBtnToggled;
        },
        createChannelOff: (state) => {
            state.createChannelBtnToggled = false;
        },
    },
});

const togglePrivateSlice = createSlice({
    name: 'toggleSwitchingPrivateChannel',
    initialState,
    reducers: {
        prvChannelOn: (state) => {
            state.privateToggled = !state.privateToggled;
        },
        prvChannelOff: (state) => {
            state.privateToggled = false;
        },
    },
});


const toggleShowContactListSlice = createSlice({
    name: 'toggleShowContactList',
    initialState,
    reducers: {
        show: (state) => {
            state.showContactListToggled = !state.showContactListToggled;
        },
        hide: (state) => {
            state.showContactListToggled = false;
        },
    },
});


export const createChannelToggleReducer = toggleCreateChannelSlice.reducer;
export const { createChannelOn, createChannelOff } = toggleCreateChannelSlice.actions;
export const togglePrivateReducer = togglePrivateSlice.reducer;
export const { prvChannelOn, prvChannelOff } = togglePrivateSlice.actions;

export const toggleShowContactListReducer = toggleShowContactListSlice.reducer;
export const { show, hide } = toggleShowContactListSlice .actions;
import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
    isShoFriendListToggled: boolean;
    createChannelBtnToggled: boolean;
    toggleNavigationBar: boolean;
    showPopUpCreateChannel:boolean;
}

const initialState: ToggleState = {
    isShoFriendListToggled: false,
    createChannelBtnToggled: false,
    toggleNavigationBar: false,
    showPopUpCreateChannel:false,

};

const toggleFriendListSlice = createSlice({
    name: 'toggleFriendList',
    initialState,
    reducers: {
        on: (state) => {
            state.isShoFriendListToggled = !state.isShoFriendListToggled;
        },
        off: (state) => {
            state.isShoFriendListToggled = false;
        },
    },
});


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

const toggleNavigationBarSlice = createSlice({
    name: 'toggleNavigationBar',
    initialState,
    reducers: {
        showNav: (state) => {
            state.toggleNavigationBar = !state.toggleNavigationBar;
        },
        hideNav: (state) => {
            state.toggleNavigationBar = false;
        },
    },
});


const togglePopUpSlice = createSlice({
    name: 'togglePopUp',
    initialState,
    reducers: {
        showPopUp: (state) => {
            state.showPopUpCreateChannel = !state.showPopUpCreateChannel;
        },
        hidePopUp: (state) => {
            state.showPopUpCreateChannel = false;
        },
    },
});



export const toggleReducer = toggleFriendListSlice.reducer;
export const { on, off } = toggleFriendListSlice.actions;

export const createChannelToggleReducer = toggleCreateChannelSlice.reducer;
export const { createChannelOn, createChannelOff } = toggleCreateChannelSlice.actions;


export const toggleNavigationBarReducer = toggleNavigationBarSlice.reducer;
export const { showNav, hideNav } = toggleNavigationBarSlice.actions;

export const togglePopUpSliceReducer = togglePopUpSlice.reducer;
export const { showPopUp, hidePopUp } = togglePopUpSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
    isShoFriendListToggled: boolean;
}

const initialState: ToggleState = {
    isShoFriendListToggled: false,
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

export const toggleReducer = toggleFriendListSlice.reducer;

export const { on, off } = toggleFriendListSlice.actions;
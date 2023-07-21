import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
    
    createChannelBtnToggled: boolean;
    createChannelPopUpToggled: boolean;
    privateToggled: boolean;
    showContactListToggled: boolean;
    showChannelMembersToggled:boolean;
   
}
interface EditUsersState {
    currentUserId: string;
    otherUserId: string;
  }

  const userInitialState: EditUsersState = {
    currentUserId: '5e56a41b-3354-4529-940c-c2a3e4f54bff',
    otherUserId: '',
  };

const initialState: ToggleState = {
    
    createChannelBtnToggled: false,
    createChannelPopUpToggled:false,
    privateToggled: false,
    showContactListToggled: false,
    showChannelMembersToggled: false,
   
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

const toggleCreateChannelPopUpSlice = createSlice({
    name: 'toggleCreateChannelPopUp',
    initialState,
    reducers: {
        createChannelPopUpOn: (state) => {
            state.createChannelPopUpToggled = !state.createChannelPopUpToggled;
        },
        createChannelPopUpOff: (state) => {
            state.createChannelPopUpToggled = false;
        },
    },
});

const toggleShowChannelMembersSlice = createSlice({
    name: 'ShowChannelMembers',
    initialState,
    reducers: {
        ShowChannelMembers: (state) => {
            state.showChannelMembersToggled = !state.showChannelMembersToggled;
        },
        HideChannelMembers: (state) => {
            state.showChannelMembersToggled = false;
        },
    },
});



const EditUserIdsSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
      setCurrentUser: (state, action: PayloadAction<string>) => {
        state.currentUserId = action.payload;
      },
      setOtherUser: (state, action: PayloadAction<string>) => {
        state.otherUserId = action.payload;
      },
    },
  });


export const createChannelToggleReducer = toggleCreateChannelSlice.reducer;
export const { createChannelOn, createChannelOff } = toggleCreateChannelSlice.actions;

export const createChannelPopUpToggleReducer = toggleCreateChannelPopUpSlice.reducer;
export const { createChannelPopUpOn, createChannelPopUpOff } = toggleCreateChannelPopUpSlice.actions;

export const togglePrivateReducer = togglePrivateSlice.reducer;
export const { prvChannelOn, prvChannelOff } = togglePrivateSlice.actions;

export const toggleShowContactListReducer = toggleShowContactListSlice.reducer;
export const { show, hide } = toggleShowContactListSlice.actions;

export const toggleShowChannelMembersReducer = toggleShowChannelMembersSlice.reducer;
export const { ShowChannelMembers, HideChannelMembers } = toggleShowChannelMembersSlice.actions;


export const EditUserIdsReducer = EditUserIdsSlice.reducer;
export const { setCurrentUser, setOtherUser } = EditUserIdsSlice.actions;
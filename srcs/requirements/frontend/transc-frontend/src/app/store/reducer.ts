import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
    
    createChannelBtnToggled: boolean;
    createChannelPopUpToggled: boolean;
    privateToggled: boolean;
    showContactListToggled: boolean;
    showChannelMembersToggled:boolean;
    refreshFetchMessages:boolean;
    refreshFetchChannels:boolean;
    roomId:string  | null;
   
}
interface EditUsersState {
    currentUserId: string;
    otherUserId: string;
}
interface selectState{
    selectedBtn: string | null;
}
const selectedInitialState: selectState ={
    selectedBtn : null
}

const userInitialState: EditUsersState = {
      currentUserId: "",
      otherUserId: "",
    };
    
const initialState: ToggleState = {
    
    createChannelBtnToggled: false,
    createChannelPopUpToggled:false,
    privateToggled: false,
    showContactListToggled: false,
    showChannelMembersToggled: false,
    refreshFetchMessages:false,
    refreshFetchChannels : false,
    roomId:null,
   
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

const selectContactConversationSlice = createSlice({
    name: 'selectedContact',
    initialState :selectedInitialState ,
    reducers: {
        selectedOne:(state, action: PayloadAction<string | null>) => {
            state.selectedBtn = action.payload;
          },
    },
});

const roomIdSlice = createSlice({
    name: 'roomId',
    initialState ,
    reducers: {
        setRoomId:(state, action: PayloadAction<string | null>) => {
            state.roomId = action.payload;
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


  const refreshFetchMessagesSlice = createSlice({
    name: 'refreshFetchMessages',
    initialState,
    reducers: {
        setRefreshOn: (state) => {
            state.refreshFetchMessages = !state.refreshFetchMessages;
        },
        setRefreshOff: (state) => {
            state.refreshFetchMessages = false;
        },
    },
});


const refreshFetchChannelsSlice = createSlice({
    name: 'refreshFetchChannels',
    initialState,
    reducers: {
        setRefreshChannelsOn: (state) => {
            state.refreshFetchChannels = !state.refreshFetchChannels;
        },
        setRefreshChannelsOff: (state) => {
            state.refreshFetchChannels = false;
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


export const refreshFetchChannelsReducer = refreshFetchChannelsSlice.reducer;
export const { setRefreshChannelsOn, setRefreshChannelsOff } = refreshFetchChannelsSlice.actions;

export const refreshFetchMessagesReducer = refreshFetchMessagesSlice.reducer;
export const { setRefreshOn, setRefreshOff } = refreshFetchMessagesSlice.actions;

export const EditUserIdsReducer = EditUserIdsSlice.reducer;
export const { setCurrentUser, setOtherUser } = EditUserIdsSlice.actions;


export const selectContactConversationReducer = selectContactConversationSlice.reducer;
export const { selectedOne } = selectContactConversationSlice.actions;

export const roomIdReducer = roomIdSlice.reducer;
export const { setRoomId } = roomIdSlice.actions;
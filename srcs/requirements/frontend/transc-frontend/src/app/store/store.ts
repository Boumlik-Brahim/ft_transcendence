import { configureStore } from "@reduxjs/toolkit"




import { createChannelToggleReducer, createChannelPopUpToggleReducer, togglePrivateReducer,toggleShowContactListReducer,toggleShowChannelMembersReducer , EditUserIdsReducer,refreshFetchMessagesReducer} from './reducer';



const store = configureStore({
  reducer: {
    createChannelToggle: createChannelToggleReducer,
    createChannelPopUpToggle: createChannelPopUpToggleReducer,
    togglePrivate: togglePrivateReducer,
    toggleShowContactList: toggleShowContactListReducer,
    toggleShowChannelMembers: toggleShowChannelMembersReducer,
    EditUserIdsSlice: EditUserIdsReducer,
    refreshFetchMessagesSlice: refreshFetchMessagesReducer
  },
});
const currentState = store.getState();


export { store }
export { currentState }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
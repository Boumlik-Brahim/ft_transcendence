import { configureStore } from "@reduxjs/toolkit"



import { toggleReducer } from './reducer';
import { createChannelToggleReducer } from './reducer';
import { toggleNavigationBarReducer } from './reducer';
import { togglePopUpSliceReducer } from './reducer';


const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    createChannelToggle: createChannelToggleReducer,
    toggleNavigation: toggleNavigationBarReducer,
    togglePopUp : togglePopUpSliceReducer,
  },
});
const currentState = store.getState();


export { store }
export { currentState }

export type RootState = ReturnType<typeof store.getState>


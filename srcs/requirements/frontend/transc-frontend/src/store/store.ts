import { configureStore } from "@reduxjs/toolkit"



import { toggleReducer } from './reducer';
const store = configureStore({
    reducer: {
      toggle: toggleReducer,
    },
});
const currentState = store.getState();


export  { store }
export { currentState}

export type RootState = ReturnType<typeof store.getState>


import reducer  from "./reducer"
import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"

const configuration =  {key : "root", storage, version: 1};
const persistedReducer = persistReducer(configuration, reducer);

const store = configureStore({
    reducer : persistedReducer
})

export const persistor  = persistStore(store);
export default store;






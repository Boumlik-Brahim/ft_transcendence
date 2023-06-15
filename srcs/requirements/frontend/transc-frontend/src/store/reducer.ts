import { createSlice } from "@reduxjs/toolkit";

export interface initialvalueType {
    value : number
}

const initialState : initialvalueType = {
    value : 0
}

const DataReducer = createSlice ({
    name : "store",
    initialState,
    reducers : {
        increment : (state : initialvalueType) => { state.value += 1 },
        decrement : (state : initialvalueType) => { state.value -= 1 }
    } 
})

export const {increment, decrement} = DataReducer.actions;
export default DataReducer.reducer;
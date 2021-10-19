import {createSlice} from "@reduxjs/toolkit";

const initialstate = {
  items: [],
  error: "",
};

const todo = createSlice({
  name: "Todo",
  initialState: initialstate,
  reducers: {
    addtotodo(state, action) {
      state.items.unshift(action.payload);
    },
    removetodo(state, action) {
      const updateditems = state.items;
      const item = updateditems.find((items) => items.id === action.payload);
      if (!item) {
        state.error = "Invalid item";
        return;
      }
      state.items = updateditems.filter((item1) => item1.id !== item.id);
    },
    errorhandler(state, action) {
      state.error = action.payload;
    },
    markcompleted(state, action) {
      const updateditems = state.items;
      const item = updateditems.findIndex(
        (items) => items.id === action.payload
      );
      if (item < 0) {
        state.error = "Invalid item";
        return;
      }
      state.items[item].todo = 0;
    },
  },
});

export const todoactions = todo.actions;

export default todo.reducer;

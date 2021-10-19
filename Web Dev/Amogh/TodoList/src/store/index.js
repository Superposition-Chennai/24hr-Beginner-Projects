import {configureStore} from "@reduxjs/toolkit";
import todoreducer from "./todo";

const store = configureStore({
  reducer: {
    todo: todoreducer,
  },
});

export default store;

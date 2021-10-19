import { configureStore } from '@reduxjs/toolkit';
import cityslice from './citydetail';
import inputslice from './input';

const store = configureStore({
  reducer: {
    city: cityslice,
    input: inputslice,
  },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialstate = {
  details: {
    icon: '',
    name: '',
    region: '',
    country: '',
    temp: '',
    wind: '',
    humidity: '',
    precipitation: '',
    code:""
  },
  error: '',
};

const cityslice = createSlice({
  name: 'city',
  initialState: initialstate,
  reducers: {
    setstate(state, action) {
      state.details = action.payload;

    },
    seterrorr(state, action) {
      state.error = action.payload.err;
    },
  },
});

export const citydetailsliceactions = cityslice.actions;
export default cityslice.reducer;

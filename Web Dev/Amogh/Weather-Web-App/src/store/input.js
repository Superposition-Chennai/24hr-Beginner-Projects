import { createSlice } from '@reduxjs/toolkit';

const inputslice = createSlice({
  name: 'input',
  initialState: {
    value: '',
    loading: false,
  },
  reducers: {
    setvalue(state, action) {
      
      console.log('py',action.payload);
      state.value = action.payload;
    },
    setloading(state,action) {
      state.loading = action.payload
      
    },
  },
});

export const inputsliceactions = inputslice.actions;
export default inputslice.reducer;

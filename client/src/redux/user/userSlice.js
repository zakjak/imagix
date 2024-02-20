import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: false,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
        state.loading = true,
        state.error = false
    },

    loginSuccess: (state, action) => {
      state.loading = false,
      state.error = false
      state.currentUser = action.payload
  },

  loginFailure: (state) => {
    // state.theme = state.theme === 'light' ? 'dark' : 'light'
}
}
   
})


export const { loginStart, loginFailure, loginSuccess } = userSlice.actions

export default userSlice.reducer
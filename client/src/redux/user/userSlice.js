import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  currentUser: null,
  error: false
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
        state.currentUser = action.payload
        state.error = false
    },
    signOut: (state, action) => {
      state.loading = false,
      state.currentUser = null
      state.error = false
  },
    loginFailure: (state, action) => {
        state.loading = true,
        state.error = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, signOut } = userSlice.actions

export default userSlice.reducer
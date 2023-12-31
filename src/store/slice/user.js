import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state, action) => {
            state.user = null;
        },
        updateDisplayNameLocal: (state, action) => {
            state.user.displayName = action.payload;
        },
        updatePhotoURLLocal: (state, action) => {
            state.user.photoURL = action.payload;
        },
        updateEmailLocal: (state, action) => {
            state.user.email = action.payload;
        },
        updatePasswordLocal: (state, action) => {
            state.user.password = action.payload;
        },
        updateEmailVerified: (state, action) => {
            state.user.emailVerified = true;
        }
    }
})

export const { setUser, removeUser, updateDisplayNameLocal, updateEmailLocal, updatePasswordLocal, updatePhotoURLLocal, updateEmailVerified } = userSlice.actions;
export default userSlice.reducer;
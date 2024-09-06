import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const setSession = createAction("session/create");
export const updateSessionUser = createAction("session/update/user")
export const destroySession = createAction("session/destroy");

const sessionReducer = createReducer(initialState, builder => {
  builder
    .addCase(setSession, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    })
    .addCase(updateSessionUser, (state, action) => {
      return { ...state, ...action.payload}
    })
    .addCase(destroySession, state => {
      state.isLoggedIn = false;
      state.user = null;
    });
});

export default sessionReducer

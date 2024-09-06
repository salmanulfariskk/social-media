import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionReducer";

const store = configureStore({
  reducer: {
    session: sessionReducer
  }
})

export default store
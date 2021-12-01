/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "./slices/admin"

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export { store }

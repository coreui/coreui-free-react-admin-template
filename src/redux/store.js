/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "./slices/admin"
import requestsReducer from "./slices/request"
import usersReducer from "./slices/user"
import categoriesReducer from "./slices/category"

const store = configureStore({
  reducer: {
    admin: adminReducer, 
    requests: requestsReducer,
    users: usersReducer,
    categories: categoriesReducer
  },
});

export { store }

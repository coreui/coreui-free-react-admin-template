/* eslint-disable */

// Request routes
export const GET_REQUEST = (user_id) => `/request/${user_id}`
export const APPROVE_REQUEST = (id) => `/admin/approve/request/video/${id}`
export const MATCH_REQUEST = (id) => `/admin/creative/${id}`
export const SUGGEST_CREATIVE = '/admin/request/match'


// User routes
export const GET_USER_BY_ID = (user_id) => `/auth/getUser/${user_id}`
export const GET_USERS = (admin_id) => `/admin/auth/getUsers/${admin_id}`


// Category routes
export const GET_CATEGORY = `/library/categories`
export const CREATE_CATEGORY = `/library/category`
export const EDIT_CATEGORY = `/library/category`

// Campaign routes
export const GET_CAMPAIGN = `/campaign/`
/* eslint-disable */

// Request routes
export const GET_REQUEST = (user_id) => `/request/${user_id}`
export const APPROVE_REQUEST = (id) => `/admin/approve/request/video/${id}`
export const MATCH_REQUEST = (id) => `/admin/creative/${id}`
export const SUGGEST_CREATIVE = '/admin/request/match'


// User routes
export const GET_USER_BY_ID = (user_id) => `/auth/getUser/${user_id}`
export const GET_USERS = (admin_id) => `/admin/auth/getUsers/${admin_id}`
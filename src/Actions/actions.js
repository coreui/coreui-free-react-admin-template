export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
  });
/* eslint-disable prettier/prettier */
const initialState = {
    sidebarShow: true,
    sidebarUnfoldable: false,
    theme: 'light',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                sidebarShow: !state.sidebarShow
            }
        case 'TOGGLE_UNFOLDABLE':
            return {
                ...state,
                sidebarUnfoldable: !state.sidebarUnfoldable
            }
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state
    }
}

export default appReducer

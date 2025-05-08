/* eslint-disable prettier/prettier */
export const toggleSideBar = () => ({
    type: 'TOGGLE_SIDEBAR',
})

export const toggleUnfoldable = () => ({
    type: 'TOGGLE_UNFOLDABLE',
})

export const switchThemeMode = (theme) => ({
    type: 'CHANGE_THEME',
    payload: theme
})

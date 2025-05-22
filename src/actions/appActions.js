/* eslint-disable prettier/prettier */
export const toggleUnfoldable = () => ({
    type: 'TOGGLE_UNFOLDABLE',
})

export const switchThemeMode = (theme) => ({
    type: 'CHANGE_THEME',
    payload: theme
})

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

export const toggleCreateTicketModalOpen = () => ({
    type: 'TOGGLE_CREATE_TICKET_MODAL_OPEN',
})

export const toggleCreateTicketModalClose = () => ({
    type: 'TOGGLE_CREATE_TICKET_MODAL_CLOSE',
})

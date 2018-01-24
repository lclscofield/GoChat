export const setUserInfo = (state, userInfo) => {
    state.userInfo = userInfo
}

export const setIsActive = (state, bool) => {
    bool ? state.isActive = bool : state.isActive = !state.isActive
}

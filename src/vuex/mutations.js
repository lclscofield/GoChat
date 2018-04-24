export const setUserInfo = (state, userInfo) => {
    state.userInfo = userInfo
}

export const setChatHistories = (state, chatHistory) => {
    if (!chatHistory) {
        state.chatHistories = []
    } else {
        state.chatHistories.push(chatHistory)
    }
}

export const setNowChat = (state, nowChat) => {
    state.nowChat = nowChat
}

export const setIsActive = (state, bool) => {
    state.isActive = bool
}

export const setShowSignUp = (state, bool) => {
    state.showSignUp = bool
}

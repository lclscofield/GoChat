export const setUserInfo = (state, userInfo) => {
    state.userInfo = userInfo
}

export const setChatHistories = (state, chatHistory) => {
    if (!chatHistory) {
        state.chatHistories = []
    } else if (chatHistory instanceof Array) {
        state.chatHistories = chatHistory
    } else {
        state.chatHistories.push(chatHistory)
    }
}

export const setNowChat = (state, nowChat) => {
    state.nowChat = nowChat
}

export const setSocket = (state, socket) => {
    state.socket = socket
}

export const setIsActive = (state, bool) => {
    state.isActive = bool
}

export const setShowSignUp = (state, bool) => {
    state.showSignUp = bool
}

export const setSearchHint = (state, obj) => {
    state.searchHint = obj
}

export const setSearchSwitch = (state, bool) => {
    state.searchSwitch = bool
}

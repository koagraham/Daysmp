const initialState = {
    userID: null,
    otherValue: "hello",
    username: null,
    loggedIn: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "USER_AUTH":
            return {
                ...state,
                userID: action.payload.userID,
                username: action.payload.username,
                loggedIn: true
            }
        case "LOGOUT":
            return {
                ...state,
                userID: null,
                username: null,
                loggedIn: false
            }
        default:
            return state
    }
}
const initialState = {
    userID: null,
    otherValue: "hello"
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "USER_AUTH":
            return {
                ...state,
                userID: action.payload,
            }
        case "LOGOUT":
            return {
                ...state,
                userID: null,
            }
        default:
            return state
    }
}
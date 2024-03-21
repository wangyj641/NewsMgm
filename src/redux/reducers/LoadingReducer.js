export const LoadingReducer = (prevState = { isLoading: false }, action) => {
    let { type, payload } = action
    console.log(type, payload)
    switch (type) {
        case "change_loading":
            console.log(payload)
            let newState = { ...prevState }
            newState.isLoading = payload
            return newState
        default:
            return prevState
    }
}
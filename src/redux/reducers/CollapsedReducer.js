export const CollapsedReducer = (prevState = { isCollapsed: false }, action) => {
    console.log(action)
    let { type } = action

    switch (type) {
        case "change_collapsed":
            let newState = { ...prevState }
            newState.isCollapsed = !prevState.isCollapsed
            return newState
        default:
            return prevState
    }
}
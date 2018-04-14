export default (state = { story: undefined }, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                story: action.story
            }
        case 'CLOSE_MODAL':
            return {
                story: undefined
            }
        default: 
            return state
    }
}
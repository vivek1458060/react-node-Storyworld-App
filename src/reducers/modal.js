export default (state = { isOpen: false }, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                story: action.story,
                isOpen: true,
            }
        case 'CLOSE_MODAL':
            return {
                isOpen: false
            }
        default: 
            return state
    }
}
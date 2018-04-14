export default (state = { selectedStory: undefined }, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                selectedStory: action.selectedStory
            }
        case 'CLOSE_MODAL':
            return {
                selectedStory: undefined
            }
        default: 
            return state
    }
}
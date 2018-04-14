export default (state = [], action) => {
    switch(action.type) {
        case 'SET_STORIES':
            return action.stories
        case 'EDIT_STORY': 
            return state.map((story) => {
                if(story._id === action.story._id) {
                    return action.story
                } 
                return story;
            })
        default:
            return state;
    }
}
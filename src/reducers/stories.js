import _ from 'lodash';

export default (state = [], action) => {
    switch(action.type) {
        case 'SET_STORIES':  
            return action.stories
        case 'ADD_STORY': 
            return [
                ...state,
                action.story       
            ]
        case 'EDIT_STORY': 
            return state.map((story) => {
                if(story._id === action.story._id) {
                    return action.story
                } 
                return story;
            })
        case 'DELETE_STORY':
            return state.filter((story) => story._id !== action._id)
        default:
            return state;
    }
}
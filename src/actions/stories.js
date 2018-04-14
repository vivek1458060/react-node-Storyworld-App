import axios from 'axios';

export const setStories = (stories) => ({
    type: 'SET_STORIES',
    stories
})

//get all public stories
export const startSetStories = () => {
    return (dispatch) => {
        return axios('/stories/public').then((response) => {
            dispatch(setStories(response.data.stories));
        })
    }
}

export const editStory = (story) => ({
    type: 'EDIT_STORY',
    story
})

export const startEditStory = (story) => {
    return(dispatch, getState) => {
        const {_id, heading, text} = story;
        const data = {heading, text};
        console.log(data);
        return axios({
            method: 'PATCH',
            url: `/stories/${_id}`,
            data,
            headers: {'x-auth': getState().auth.authToken}
        }).then((response) => {
            dispatch(editStory(response.data.story))
        }).catch((e) => {
            console.log(e);
        })
    }
}
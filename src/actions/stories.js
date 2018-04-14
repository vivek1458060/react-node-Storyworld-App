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
        const {_id, heading, text, privacy} = story;
        const data = {heading, text, privacy};
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

export const addStory = (story) => ({
    type: 'ADD_STORY',
    story
})

export const startAddStory = (story) => {
    return(dispatch, getState) => {
        const {heading, text, privacy} = story;
        const data = {heading, text, privacy};
        return axios({
            method: 'post',
            url: `/stories`,
            data,
            headers: {'x-auth': getState().auth.authToken}
        }).then((response) => {
            dispatch(addStory(response.data.story))
        }).catch((e) => {
            console.log(e);
        })
    }
}

export const deleteStory = (_id) => ({
    type: 'DELETE_STORY',
    _id
})

export const startDeleteStory = (_id) => {
    return(dispatch, getState) => {
        return axios({
            method: 'delete',
            url: `/stories/${_id}`,
            headers: {'x-auth': getState().auth.authToken}
        }).then((response) => {
            dispatch(deleteStory(_id))
        }).catch((e) => {
            console.log(e);
        })
    }
}
const storyData = {
    heading: '',
    text: '',
    privacy: false
}
export const openModal = (story = storyData) => ({
    type: 'OPEN_MODAL',
    story
})

export const closeModal = () => ({
    type: 'CLOSE_MODAL'
})



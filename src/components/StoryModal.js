import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {startEditStory} from '../actions/stories';
import {closeModal} from '../actions/modal';
import Textarea from "react-textarea-autosize";

export class StoryModal extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        if(this.props.uid === this.props.selectedStory._creator) {
            this.props.startEditStory({
                _id: this.props.selectedStory._id,
                heading: e.target.heading.value,
                text: e.target.text.value,
                // private: e.target.private.checked
            });
        }
        this.props.closeModal();
    }
    render() {
        return (
            <div>
                <Modal 
                    isOpen={!!this.props.selectedStory}
                    onRequestClose={this.props.closeModal}
                    contentLabel="Story Modal"
                    closeTimeoutMS={300}
                    className="modal"
                >
                    {
                        this.props.selectedStory && (
                            <form onSubmit={this.onSubmit}>
                                <input 
                                    className="modal__title" 
                                    defaultValue={this.props.selectedStory.heading} 
                                    name="heading"
                                    disabled={ !(this.props.uid === this.props.selectedStory._creator) }
                                />
                                <Textarea 
                                    name="text"
                                    className="modal__body"
                                    minRows={5} 
                                    maxRows={25} 
                                    defaultValue={this.props.selectedStory.text}
                                    disabled={ !(this.props.uid === this.props.selectedStory._creator) }
                                    >
                                </Textarea>
                                <div className="modal__footer">
                                    <span>Private</span>
                                    <input 
                                        defaultChecked={true}
                                        type="checkbox" 
                                        name="private"
                                    />
                                    <button 
                                        className="button button--link"
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        )
                    }
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedStory: state.modal.selectedStory,
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    startEditStory: (story) => dispatch(startEditStory(story))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryModal);
import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {startEditStory, startAddStory, startDeleteStory} from '../actions/stories';
import {closeModal} from '../actions/modal';
import Textarea from "react-textarea-autosize";
import MdDelete from 'react-icons/lib/md/delete';

export class StoryModal extends React.Component {
    state = {}
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.story,
            disabled: nextProps.story ? (
                nextProps.story._creator ? !(nextProps.story._creator === this.props.uid) : false
            ) : false
        })
    }
    onHeadingChange = (e) => {
        this.setState({heading: e.target.value})
    }
    onTextChange = (e) => {
        this.setState({text: e.target.value})
    }
    onPrivacyChange = (e) => {
        this.setState({privacy: e.target.checked})
    }
    deleteStory = () => {
        this.props.startDeleteStory(this.state._id);
        this.props.closeModal();
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.props.story._creator) {
            if(this.props.uid === this.props.story._creator) { // edit mode
                this.props.startEditStory({
                    _id: this.props.story._id,
                    heading: e.target.heading.value,
                    text: e.target.text.value,
                    privacy: e.target.privacy.checked
                });
            }
        } else { //add mode
            this.props.startAddStory({
                heading: e.target.heading.value,
                text: e.target.text.value,
                privacy: e.target.privacy.checked
            });
        }
        this.props.closeModal(); //close model for all three mode
    }
    render() {
        return (
            <div>
                <Modal 
                    isOpen={!!this.props.story}
                    onRequestClose={this.props.closeModal}
                    contentLabel="Story Modal"
                    closeTimeoutMS={300}
                    className="modal"
                >
                    <form onSubmit={this.onSubmit}>
                        <input 
                            className="modal__title" 
                            value={this.state.heading} 
                            name="heading"
                            placeholder="Name of your story"
                            disabled={ this.state.disabled }
                            onChange={this.onHeadingChange}
                        />
                        <Textarea 
                            name="text"
                            placeholder="text"
                            className="modal__body"
                            minRows={5} 
                            maxRows={25} 
                            value={this.state.text}
                            disabled={ this.state.disabled }
                            onChange={this.onTextChange}
                            >
                        </Textarea>
                        <div className="modal__footer">
                            {  !this.state.disabled && (
                                <div>
                                    <span>keep private </span>
                                    <input 
                                        checked={this.state.privacy}  //defaultChecked
                                        type="checkbox" 
                                        name="privacy"
                                        onChange={this.onPrivacyChange}
                                    />
                                    { this.state._creator && (
                                        <MdDelete 
                                            className="fa fa-delete"
                                            onClick={this.deleteStory} 
                                        />
                                    )}
                                </div>
                            )}
                            <button 
                                className="button button--link"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    story: state.modal.story,
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    startEditStory: (story) => dispatch(startEditStory(story)),
    startAddStory: (story) => dispatch(startAddStory(story)),
    startDeleteStory: (_id) => dispatch(startDeleteStory(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryModal);
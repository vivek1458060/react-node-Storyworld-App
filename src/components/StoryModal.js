import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {startEditStory, startAddStory, startDeleteStory} from '../actions/stories';
import {closeModal} from '../actions/modal';
import Textarea from "react-textarea-autosize";
import MdDelete from 'react-icons/lib/md/delete';

export class StoryModal extends React.Component {
    state = {
        ...this.getDefaultState()
    }
    getDefaultState() {
        return {
            _id: null,
            heading: '',
            text: '',
            privacy: '',
            completed: null,
            completedAt: null,
            _creator: null,
            creatorName: null,
            isCurrentUserStory: null,
            error: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.story,
            isCurrentUserStory: nextProps.story ? (
                nextProps.story._creator ? (nextProps.story._creator === this.props.uid) : true
            ) : true
        })
    }
    onHeadingChange = (e) => {
        this.setState({heading: e.target.value, error: ''})
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
        this.setState({...this.getDefaultState()})
    }
    onSubmit = (e) => {
        e.preventDefault();
        const _id = this.state._id;
        const heading = this.state.heading;
        const text = this.state.text;
        const privacy = this.state.privacy;
        const _creator = this.state._creator;

        if(this.props.story) { //if story exist, then we are either in edit or read mode
            if(this.props.uid === _creator) { // edit mode
                if(this.state.heading) {
                    this.props.startEditStory({ _id, heading, text, privacy });
                } else if(text.trim()) {
                    this.setState({error: 'name your story'})
                } else {
                    this.props.startDeleteStory(_id);
                }
            }
        } else { //add mode
            if(heading) {
                this.props.startAddStory({ heading, text, privacy });
            } else if(text.trim()) {
                this.setState({error: 'name your story'})
            }
        }

        this.setState((prevState) => {
            if(!prevState.error) {
                this.props.closeModal();
                return {...this.getDefaultState()}
            }
        })
    }
    render() {
        return (
            <div>
                <Modal 
                    isOpen={!!this.props.isOpen}
                    onRequestClose={this.onSubmit}
                    contentLabel="Story Modal"
                    closeTimeoutMS={300}
                    className="modal"
                >
                    <form onSubmit={this.onSubmit}>
                        {this.state.error && <span className="modal__error">{this.state.error}</span>}
                        <input 
                            className="modal-title" 
                            value={this.state.heading} 
                            name="heading"
                            placeholder="Name of your story"
                            disabled={ !this.state.isCurrentUserStory }
                            onChange={this.onHeadingChange}
                        />
                        <Textarea 
                            name="text"
                            placeholder="text"
                            className="modal-body"
                            minRows={5} 
                            maxRows={25} 
                            value={this.state.text}
                            disabled={ !this.state.isCurrentUserStory }
                            onChange={this.onTextChange}
                            >
                        </Textarea>
                        <div className="modal-footer">
                            {  this.state.isCurrentUserStory && (
                                <div className="modal-footer__actions">
                                    <span>keep private 
                                        <input 
                                            checked={this.state.privacy}  //defaultChecked
                                            type="checkbox" 
                                            name="privacy"
                                            onChange={this.onPrivacyChange}
                                        />
                                    </span>
                                    { this.state._id && ( //for new story, don't show delete icon
                                        <button onClick={this.deleteStory} className="button button--link">delete</button>
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
    isOpen: state.modal.isOpen,
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    startEditStory: (story) => dispatch(startEditStory(story)),
    startAddStory: (story) => dispatch(startAddStory(story)),
    startDeleteStory: (_id) => dispatch(startDeleteStory(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryModal);
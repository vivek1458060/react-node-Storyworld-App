import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../actions/modal';
import {StartSetSingleUserStories} from '../actions/stories';
import FaEdit from 'react-icons/lib/fa/edit';
import MdDelete from 'react-icons/lib/md/delete';
import {history} from '../routers/AppRouter';

export class Story extends React.Component {
    state = {
        story: this.props.story
    }
    handlePick = () => {
        this.props.openModal(this.props.story)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({story: nextProps.story})
    }
    hanldeUser = () => {
        const storyCreator = this.state.story._creator;
        this.props.StartSetSingleUserStories(storyCreator);
        history.push(`/profile/${storyCreator}`);
    }
    render() {
        return (
            <div className="story">
                <div onClick={this.handlePick}>
                    <div className="story__title">
                        <h4>{this.state.story.heading}</h4>
                        { this.props.uid === this.state.story._creator && (
                            <div className="icons">
                                <MdDelete className="fa fa-delete" />
                                <FaEdit className="fa fa-edit" />
                            </div>
                        )}
                    </div>
                    <p className="story__body">{this.state.story.text}...</p>
                </div>
                <div className="story__footer">
                    <button 
                        className="button button--link"
                        onClick={this.hanldeUser}
                    >
                        by {this.state.story.creatorName}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    openModal: (story) => dispatch(openModal(story)),
    StartSetSingleUserStories: (_id) => dispatch(StartSetSingleUserStories(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Story);
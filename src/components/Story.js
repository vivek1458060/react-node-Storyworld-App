import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../actions/modal';
import FaEdit from 'react-icons/lib/fa/edit';

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
    render() {
        return (
            <div className="story" onClick={this.handlePick}>
                <div>
                    <h4 className="story__title">
                        {this.state.story.heading} 
                        { this.props.uid === this.state.story._creator && <FaEdit className="fa fa-edit" />}
                    </h4>
                    <p className="story__body">{this.state.story.text}...</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    openModal: (story) => dispatch(openModal(story))
})

export default connect(mapStateToProps, mapDispatchToProps)(Story);
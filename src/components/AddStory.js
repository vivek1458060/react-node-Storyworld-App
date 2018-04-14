import React from 'react';
import FaPencil from 'react-icons/lib/fa/pencil';
import {openModal} from '../actions/modal';
import {connect} from 'react-redux';

export const AddStory = (props) => (
    <div className="add-story">
        <input 
            type="text" 
            className="text-input add-story--text-input" 
            placeholder="write your story" 
            onClick={() => props.openModal()}
        />
        <div className="add-story__icons">
            <FaPencil className="fa fa-pencil"/>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    openModal: () => dispatch(openModal())
})

export default connect(undefined, mapDispatchToProps)(AddStory);
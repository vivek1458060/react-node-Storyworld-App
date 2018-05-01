import React from 'react';
import {connect} from 'react-redux';

const Message = ({uid, fullName, message, createdAt, currentUser}) => (
    <li className={uid === currentUser ? 'message message--align-right' : 'message message--align-left'}>
        <div className="message__title">
            <span>{createdAt}</span>
            <h3>{fullName}</h3>
        </div>
        <div className="message__body">
            <p>{message}</p>
        </div>
    </li>
)

const mapStateToProps = (state) => ({
    currentUser: state.auth.uid
})

export default connect(mapStateToProps)(Message);
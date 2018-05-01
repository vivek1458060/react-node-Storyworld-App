import React from 'react';

const User = ({dpUrl, fullName, lastMessage}) => (
    <li className="user">
        <img className="avatar" src={`http://res.cloudinary.com/hpustufki/image/upload/h_200,w_200,c_fill,g_face/${dpUrl}`}  />
        <div className="user__title">
            <h3>{fullName}</h3>
            <span>{lastMessage}</span>
        </div>
    </li>
)

export default User;
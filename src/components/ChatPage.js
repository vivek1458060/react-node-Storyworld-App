import React from 'react';
import User from './User';
import Message from './Message';
import io from 'socket.io-client';

class ChatPage extends React.Component {
    state = {
        users: [],
        messages: []
    }

    componentDidMount() {
        const socket = io();
        socket.on('connect', () => {
            console.log('connected!');
        })
        socket.on('disconnect', () => {
            console.log('disconnected!');
        })   
    }

    render() {
        return (
            <div className="chat">
                <div className="chat-sidebar display-for-desktop">
                    <h3>People</h3>
                    <div className="chat-sidebar__user-search">
                        <i className="fa fa-search"></i>
                        <input type="text" />
                    </div>
                    <ol className="users">
                        { this.state.users.map((user) => <User {...user} key={user.dpUrl}/>) }
                    </ol>
                </div>
                <div className="chat-main">
                    <div className="chat-header">
                        <img className="avatar" src="https://avatars0.githubusercontent.com/u/26858253?v=4" width="50" height="50"/>
                        <div className="chat-header__title">
                            <h3>Chat in heritage-talent group</h3>
                            <span>already 1902 messages</span>
                        </div>
                    </div>
                    <ol className="chat-messages" id="messages">
                        {
                            this.state.messages.map((message) => <Message {...message} key={message.uid}/>)
                        }
                    </ol>
                    <div className="chat-footer">
                        <form id="message-form">
                            <input type="text" placeholder="message" name="message" autoFocus />
                            <button className="button">Send</button>
                        </form>
                        <button className="button" id="send-location">Send location</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatPage;

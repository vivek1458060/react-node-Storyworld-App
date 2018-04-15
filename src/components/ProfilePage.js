import React from 'react';
import { connect } from 'react-redux';
import Stories from './Stories';
import AddStory from './AddStory';

export class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title page-header__title--quote">There are two great days in a person's life - the day we are born and the day we discover why.</h1>
                    </div>
                    <div className="page-header__profile-info">
                        <div>
                            <img className="img" src="https://avatars0.githubusercontent.com/u/26858253?v=4"/>
                        </div>
                        <ul>
                            <li><b>{this.props.stories[0].creatorName}</b></li>
                            <li>Software engineer at Tata Consultancy Services</li>
                            <li className="muted-text">Hyderabad Area, India</li>
                        </ul>
                    </div>   
                </div>
                <div className="content-container">
                        {this.props.stories[0]._creator === this.props.uid && <AddStory />}
                        <h1>Recent posts</h1>
                        <Stories 
                            stories={this.props.stories}
                        />
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    uid: state.auth.uid,
    stories: state.stories.filter((story) => story._creator === props.match.params.id)
})

export default connect(mapStateToProps)(ProfilePage);

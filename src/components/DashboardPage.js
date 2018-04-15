import React from 'react';
import {Link} from 'react-router-dom';
import PublicStories from './PublicStories';
import {connect} from 'react-redux';

export const DashboardPage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Everyone Has a Story to Tell</h1>
                <p className="page-header__subtitle">Show your story to the world</p>
                <div className="page-header__actions">
                    <Link className="button" to={'/profile/' + props.uid}>View profile</Link>
                </div>
            </div>
        </div>
        <div className="content-container">
            <PublicStories />
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    uid: state.auth.uid
})

export default connect(mapStateToProps)(DashboardPage);
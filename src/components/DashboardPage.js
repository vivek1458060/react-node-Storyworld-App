import React from 'react';
import {Link} from 'react-router-dom';
import PublicStories from './PublicStories';

export const DashboardPage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Everyone Has a Story to Tell</h1>
                <p className="page-header__subtitle">Show your story to the world</p>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add my story</Link>
                </div>
            </div>
        </div>
        <PublicStories />
    </div>
);

export default DashboardPage;
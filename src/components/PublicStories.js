import React from 'react';
import { connect } from 'react-redux';
import Stories from './Stories';
   
export const PublicStories = (props) => (
    <div>
        <div className="content-container">
            <h3>Public Stories</h3>
        </div>
        <Stories 
            stories={props.stories}
        />
    </div>
) 

const mapStateToProps = (state) => ({
    stories: state.stories.filter((story) => story.privacy !== true)
})

export default connect(mapStateToProps)(PublicStories);
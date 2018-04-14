import React from 'react';
import {connect} from 'react-redux';
import Story from './Story';

export class PublicStories extends React.Component {
    state = {
        storyColumn1: [],
        storyColumn2: [],
        storyColumn3: []
    }
    divideStories = (nextProps = this.props) => {
        var total = nextProps.stories.length;
        var each = Math.floor(total/3);
        var left = total - 3*Math.floor(total/3);
        var f, s, t;
        var fs, fe, ss, se , ts, te;
        f = s = t = each; 
        if(left == 1) {
            s  += 1
        } else if(left == 2) {
            f += 1;
            s += 1;
        }
        fs = 0;
        fe = f-1;
        ss = fe+1;
        se = fe+s;
        ts = se+1;
        te = total-1;
        const storyColumn1 = [];
        const storyColumn2 = [];
        const storyColumn3 = [];
        nextProps.stories.forEach((story, index) => {
            if(index <= fe) {
                storyColumn1.push(story);
            } else if(index >= ss && index <= se ) {
                storyColumn2.push(story);
            } else {
                storyColumn3.push(story);
            }
        })
        this.setState({storyColumn1, storyColumn2, storyColumn3});
    }
    componentDidMount() {
        this.divideStories();
    } 
    componentWillReceiveProps(nextProps) {
        this.divideStories(nextProps);
    }
    render() {
        return (
            <div className="content-container">
                <div className="public-stories">
                    <div className="story-column story-column1">
                        {
                            this.state.storyColumn1.map((story) => (
                                <Story 
                                    story={story}
                                    key={story._id}
                                />
                            ))
                        }
                    </div>
                    <div className="story-column story-column2">
                        {
                            this.state.storyColumn2.map((story) => (
                                <Story 
                                    story={story}
                                    key={story._id}
                                />
                            ))
                        }
                    </div>
                    <div className="story-column story-column3">
                        {
                            this.state.storyColumn3.map((story) => (
                                <Story 
                                    story={story}
                                    key={story._id}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stories: state.stories
})

export default connect(mapStateToProps)(PublicStories);
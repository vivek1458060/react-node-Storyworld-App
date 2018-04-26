import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Stories from './Stories';
import AddStory from './AddStory';
import {startSetSingleUserStories} from '../actions/stories';
import MdEdit from 'react-icons/lib/md/edit';
import {FaQuoteLeft, FaQuoteRight, FaCamera} from 'react-icons/lib/fa';
import axios, { post } from 'axios';
import _ from 'lodash';

export class ProfilePage extends React.Component {
    state = {
        coverQuote: '',
        dpUrl: '',
        fullName: '',
        bio: '',
        location: '',
        stories: null,
        selectedDp: null,
        coverQuoteDisplay: true,
        fullNameDisplay: true,
        bioDisplay: true,
        locationDisplay: true,

    }
    
    uid = this.props.match.params.uid;
    currentUser = this.uid === this.props.uid;
    componentWillMount() {

        axios({
            method: 'get',
            url: `/users/${this.uid}`,
            headers: {'x-auth': this.props.authToken}
        }).then((res) => {
            const {coverQuote, fullName, dpUrl, bio, location} = res.data.user;
            this.setState({ coverQuote, fullName, dpUrl, bio, location })
        }).catch((e) => {
            console.log(e);
        })

        if(this.uid === this.props.uid) {      // get all(private and pubic) stories of current user by userid
            return axios({
                method: 'get',
                url: `/stories`,
                headers: {'x-auth': this.props.authToken}
            }).then((response) => {
                this.setState({stories: response.data.stories})
            }).catch((e) => {
                console.log(e);
            })
        } else {                          // get pubic stories of individual user by userid
            return axios({
                method: 'get',
                url: `/stories/allpublic/${this.uid}`
            }).then((response) => {
                this.setState({stories: response.data.stories})
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    componentWillReceiveProps(nextProps) { 
        const prevProps = this.props;
        let totalPrevStoriesFromStore= prevProps.stories.length
        let totalCurrentStoriesFromStore = nextProps.stories.length;
        if(totalCurrentStoriesFromStore > totalPrevStoriesFromStore) {
            const addedStory = _.differenceWith(nextProps.stories, prevProps.stories, _.isEqual)[0];
            if(addedStory) {      // one story added or edited in store
                this.setState((prevState) => ({
                    stories: _.concat(prevState.stories, addedStory)
                }));
            }
        } else if(totalCurrentStoriesFromStore == totalPrevStoriesFromStore) {
            const editedStory = _.differenceWith(nextProps.stories, prevProps.stories, _.isEqual)[0];
            if(editedStory) {      // one story added or edited in store
                this.setState((prevState) => ({
                    stories: prevState.stories.map((story) => {
                        if(story._id == editedStory._id) {
                            return editedStory;
                        }
                        return story;
                    })
                }));
            }
        } else {
            const deletedStory = _.differenceWith(prevProps.stories, nextProps.stories, _.isEqual)[0];
            if(deletedStory) {      // one story deleted in store
                this.setState({
                    stories: this.state.stories.filter(({_id}) => _id !== deletedStory._id)
                });
            }
        }
    }
    dpUploadHandler = e => {
        this.setState({
            selectedDp: e.target.files[0],
            filename: null
        }, () => {
            const fd = new FormData();
            fd.append('file', this.state.selectedDp);
            post('/upload', fd, {
                headers: { 'x-auth': localStorage.getItem('x-auth')},
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    console.log(loaded, total);
                  },
            }).then((res) => {
                this.setState({
                    dpUrl: res.data.dpUrl
                })
            })
        }) 
    }
    handleFormDisplay = (toEdit) => {
        const toEditDisplay = toEdit + 'Display';
        this.setState({ 
            [toEditDisplay]: false
        })
    }
    onCoverQuoteChange = (e) => {
        this.setState({ coverQuote: e.target.value })
    }
    onBioChange = (e) => {
        this.setState({ bio: e.target.value })
    }
    onLocationChange = (e) => {
        this.setState({ location: e.target.value })
    }
    onEditedSubmit = (e, toEdit) => {
        e.preventDefault();
        const toEditDisplay = toEdit + 'Display';
        this.setState({ 
            [toEditDisplay]: true
        })
        const data = {
            [toEdit]: e.target[toEdit].value
        }
        axios({
            method: 'post',
            url: `/users/edit`,
            data,
            headers: {'x-auth': this.props.authToken}
        }).then((res) => {
            console.log('success');
        }).catch((e) => {
            console.log(e);
        })
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        { this.state.coverQuoteDisplay ? (
                            <h1 className="page-header__title page-header__title--quote">
                                {this.state.coverQuote}
                                {this.currentUser && 
                                    <MdEdit className="fa fa-white"
                                        onClick={(e) => this.handleFormDisplay('coverQuote')}
                                    />
                                }
                            </h1> 
                            ) : (
                                <form onSubmit={(e) => this.onEditedSubmit(e, 'coverQuote')} className="profile-edit-form">
                                    <textarea 
                                        type="text"
                                        value={this.state.coverQuote}
                                        name="coverQuote"
                                        onChange={this.onCoverQuoteChange}
                                    />
                                    <div>
                                        <button type="button">Cancel</button>
                                        <button>Save</button>
                                    </div>
                                </form>
                            )
                        }
                    </div>
                    <div className="page-header__profile-info">
                        <div>
                            <div className="dp-container">
                                <img className="img" src={`http://res.cloudinary.com/hpustufki/image/upload/c_fill,h_150,w_150,g_face/${this.state.dpUrl}`}/>
                                { this.currentUser && (
                                <div>
                                    <input
                                        style={{ 'display': 'none' }}
                                        type="file"
                                        onChange={this.dpUploadHandler}
                                        ref={ fileInput => this.fileInput = fileInput }
                                    />
                                    <button onClick={() => this.fileInput.click()} className="upload-button">
                                        <span className="show-for-desktop"><FaCamera /> upload profile pic</span>
                                        <span className="show-for-mobile"><FaCamera /> Edit</span>
                                    </button>
                                </div>
                                )}
                            </div>
                        </div>
                        <ul className="intro">
                            {this.state.fullName && <li><b>{this.state.fullName}</b></li> }
                            {this.state.bioDisplay ? (
                                <li>
                                    {this.state.bio}
                                    {this.currentUser && 
                                        <MdEdit className="fa fa-blue"
                                            onClick={(e) => this.handleFormDisplay('bio')}
                                        />
                                    }
                                </li>
                            ) : (
                                <form onSubmit={(e) => this.onEditedSubmit(e, 'bio')} className="profile-edit-form">
                                    <input 
                                        type="text"
                                        value={this.state.bio}
                                        name="bio"
                                        onChange={this.onBioChange}
                                    />
                                    <div>
                                        <button type="button">Cancel</button>
                                        <button>Save</button>
                                    </div>
                                </form>
                            )}
                            {this.state.locationDisplay ? (
                                <li className="muted-text">
                                    {this.state.location}
                                    {this.currentUser && 
                                        <MdEdit className="fa fa-blue"
                                            onClick={(e) => this.handleFormDisplay('location')}
                                        />
                                    }
                                </li>
                            ) : (
                                <form onSubmit={(e) => this.onEditedSubmit(e, 'location')} className="profile-edit-form">
                                    <input 
                                        type="text"
                                        value={this.state.location}
                                        name="location"
                                        onChange={this.onLocationChange}
                                    />
                                    <div>
                                        <button type="button">Cancel</button>
                                        <button>Save</button>
                                    </div>
                                </form>
                            )}
                        </ul>
                    </div>   
                </div>
                <div className="content-container">
                        { this.currentUser && <AddStory />}
                        {this.state.stories && this.state.stories.length ? 
                            <h3>Recent posts</h3> : <h3>no post added yet</h3>}
                        {this.state.stories && (
                            <Stories 
                                stories={this.state.stories}
                            />
                        )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    uid: state.auth.uid,
    authToken: state.auth.authToken,
    stories: state.stories.filter(({_creator}) => _creator === props.match.params.uid)
})

export default connect(mapStateToProps)(ProfilePage);

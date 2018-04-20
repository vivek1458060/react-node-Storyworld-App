import React from 'react'
import axios, { post } from 'axios';

class EditProfilePage extends React.Component {
    state = {
        selectedDp: null,
        dpName: null
    }
    dpUploadHandler = e => {
        this.setState({
            selectedDp: e.target.files[0],
            filename: null
        }, () => {
            const fd = new FormData();
            fd.append('file', this.state.selectedDp);
            post('/upload', fd, {
                headers: { 'x-auth': localStorage.getItem('x-auth')}
            }).then((res) => {
                this.setState({
                    dpName: res.data.filename
                })
            })
        }) 
    }

    render() {
        return (
            <div>
            <img src={`/uploads/${this.state.dpName}`} />
                <input
                    style={{ 'display': 'none' }}
                    type="file"
                    onChange={this.dpUploadHandler}
                    ref={ fileInput => this.fileInput = fileInput }
                />
                <button onClick={() => this.fileInput.click()}>upload file</button>
            </div>
        )
    }
}



export default EditProfilePage;
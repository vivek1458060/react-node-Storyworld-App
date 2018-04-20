import React from 'react';

class UpdateForm extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e.target.update.value);
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <textarea
                    className="textarea"
                    placeholder="add cover Quote"
                    name="update"
                >
                </textarea>
                <button className="button button--link">Save</button>
            </form>
        )
    }
}

export default UpdateForm;
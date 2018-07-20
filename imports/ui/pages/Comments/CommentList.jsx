import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {comments: null};
    }

    componentDidMount() {
        Meteor.call('comment.list', this.props.postId, (err, comments) => {
            this.setState({comments});
        });
    }

    componentDidUpdate() {
        Meteor.call('comment.list', this.props.postId, (err, comments) => {
            this.setState({comments});
        });
    }

    handleDelete = (commentId) => {
        // Remove comment
        Meteor.call('comment.remove', commentId);
        alert("comment deleted");
    }

    render() {
        const {comments} = this.state;

        if (!comments) {
            return <div>Loading....</div>
        }

        return (
            <div className="comment">
                {
                    comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <p>Text: {comment.text}, Email: {comment.email}</p>
                                { Meteor.userId() && ( Meteor.userId() === comment.userId )
                                    || ( Meteor.userId() === this.props.userId )  ?
                                    <button onClick={() => {
                                       this.handleDelete(comment._id)}
                                    }> Delete
                                    </button> : ''
                                }
                                <hr/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

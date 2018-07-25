import {Meteor} from 'meteor/meteor';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import React from 'react';
import moment from 'moment';

// Import component
import CommentCreate from '../Comments/CommentCreate';
import PostWithCommentListQuery from '/imports/api/posts/postWithCommentListQuery';

// Create and export component
class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.updateViewCount', this.props.match.params._id, (err, post) => {
            // Console error if exist
            if (err) {
                console.log("error", err);
            }
        });
    }

    // Method for Delete comment
    handleDelete = (commentId) => {
        // Remove comment
        Meteor.call('comment.remove', commentId);
    }

    // Method Delete all comment
    handleDeleteAll = (postId) => {
        // Remove all comments belong to current postid
        Meteor.call('comment.removeAll', postId);
    }

    render() {
        const post = this.props.data;
        const {history} = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <button onClick={() => history.push('/posts')}>Back to posts</button>
                <div key={post._id}>
                    <p>Post id: {post._id} </p>
                    <p>Post title: {post.title}, Post Description: {post.description} </p>
                    <p>Post type: {post.type} </p>
                    <p>Post Created At:
                        {post.createdAt ? moment(post.createdAt).format("YYYY-MM-DD hh:mm") : ''}
                    </p>
                    <p>Post View Count: {post.views} </p>
                    <hr/>
                    <CommentCreate postId={post._id}/>
                    <p>Comments: </p>
                    {
                        post.comments.map((comment) => {
                            return (
                                <div key={comment._id}>
                                    <p>Text: {comment.text}, Email: {comment.user.email
                                        ? comment.user.email : comment.user.emails[0].address}</p>
                                    { Meteor.userId() && ( Meteor.userId() === comment.userId )
                                        || ( Meteor.userId() === post.owner._id )  ?
                                        <button onClick={() => {
                                        this.handleDelete(comment._id)}
                                        }> Delete
                                        </button> : ''
                                    }
                                    <hr/>
                                </div>
                            )
                        })
                    }

                    { Meteor.userId() &&  ( Meteor.userId() === post.userId) && post.comments
                        && post.comments.length > 0  ?
                        <button onClick={() => {
                           this.handleDeleteAll(post._id)
                        }}> Delete All Comments
                        </button> : ''
                    }
                </div>
            </div>
        );
    }
}

// Export query using withQuery
export default withQuery(props => {
        return PostWithCommentListQuery.clone(
            {
                _id: props.match.params._id,
            }
        );
    },
    { reactive: true,  single: true /* return single record */}
)(PostView);

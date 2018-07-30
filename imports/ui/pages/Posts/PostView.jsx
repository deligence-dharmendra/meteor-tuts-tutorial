// Import package
import {Meteor} from 'meteor/meteor';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
// Import component
import CommentCreate from '../Comments/CommentCreate';
import PostWithCommentListQuery from '/imports/api/posts/postWithCommentListQuery';

// Create and export component
class PostView extends React.Component {
    constructor() {
        super();
        this.state = { post: null };

        // Initialize and bind method
        this.handleNavigation = this.handleNavigation.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAllComments = this.handleDeleteAllComments.bind(this);
    }

    // Handle back click button using props history
    handleNavigation(event){
        const { history } = this.props;
        const type = event.target.dataset.type;
        // Create url
        const url = { back: "/posts" };
        // Push url in history
        history.push(url[type]);
    }

    componentDidMount() {
        Meteor.call('post.updateViewCount', this.props.match.params._id);
    }

    // Method for Delete comment
    handleDelete = (event) => {
        const commentId = event.target.dataset.id;
        // Remove comment
        Meteor.call('comment.remove', commentId);
    }

    // Method Delete all comment
    handleDeleteAllComments = (event) => {
        const postId = event.target.dataset.id;
        // Remove all comments belong to current postid
        Meteor.call('comment.removeAll', postId);
    }

    render() {
        const post = this.props.data;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <button onClick={this.handleNavigation} data-type="back">
                    Back to posts
                </button>
                <div key={post._id}>
                    <p>
                        <b>Post id:</b> { post._id } <br/>
                        <b>Post title:</b> { post.title } <br/>
                        <b>Post Description:</b> { post.description } <br/>
                        <b>Post type:</b> { post.type } <br/>
                        <b>Post Created At:</b> { post.createdAt
                            ? moment(post.createdAt).format("YYYY-MM-DD hh:mm") : '' } <br/>
                        <b>Post View Count:</b>  {post.views }
                    </p>
                    <hr/>
                    <CommentCreate postId={post._id}/>
                    <p><b>Comments:</b></p>
                    {
                        post.comments.map((comment) => {
                            return (
                                <div key={comment._id}>
                                    <p>
                                        Text: {comment.text} <br/>
                                        Email: {comment.user.email ? comment.user.email
                                            : comment.user.emails[0].address}
                                    </p>

                                    { Meteor.userId() && ( Meteor.userId() === comment.userId )
                                        || ( Meteor.userId() === post.owner._id )  ?

                                        <button onClick={this.handleDelete} data-id={comment._id}>
                                            Delete Comment
                                        </button> : ''
                                    }
                                    <hr/>
                                </div>
                            )
                        })
                    }

                    { Meteor.userId() &&  ( Meteor.userId() === post.userId) && post.comments
                        && post.comments.length > 0  ?
                        <button onClick={this.handleDeleteAllComments} data-id={post._id}>
                            Delete All Comment
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

// Define history, data, match propsType validation
PostView.propTypes = {
    history: PropTypes.object,
    data: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            _id: PropTypes.string.isRequired,
        }),
    }),
};
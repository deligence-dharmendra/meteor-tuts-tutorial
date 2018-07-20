import {Meteor} from 'meteor/meteor';
import React from 'react';
import moment from 'moment';
// Import component
import CommentCreate from '../Comments/CommentCreate';
import CommentList from '../Comments/CommentList';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    handleDeleteAll = (postId) => {
        Meteor.call('comment.removeAll', postId);
        alert("comments deleted");
    }

    render() {
        const {post} = this.state;
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
                    <p>Comments: </p>
                    <CommentList postId={post._id} userId={post.userId}/>
                    { Meteor.userId() &&  ( Meteor.userId() === post.userId )  ?
                        <button onClick={() => {
                           this.handleDeleteAll(post._id)
                        }}> Delete All Comments
                        </button> : ''
                    }
                    <hr/>
                    <CommentCreate postId={post._id}/>
                </div>
            </div>
        );
    }
}

import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import PostListQuery from '/imports/api/posts/postListQuery';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    // Delete post and linked comments
    handleDelete = (postId) => {
        // Delete linked comments
        Meteor.call('comment.removeAll', postId);
        // Delete post
        Meteor.call('post.remove', postId);
        alert("post deleted");
    }

    render() {
        const {history} = this.props;
        const posts = this.props.data;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>
                                    Post title: {post.title},
                                    Post Description: {post.description},
                                    View: {post.views},
                                    Total Comments: {post.comments? post.comments.length : 0}
                                </p>
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id) }}> Edit post
                                </button>

                                {/* Add post view button */}
                                <button onClick={() => {
                                    history.push("/posts/view/" + post._id) }}> View post
                                </button>

                                { Meteor.userId() &&  ( Meteor.userId() === post.userId )  ?
                                    <button onClick={() => {
                                        this.handleDelete(post._id) }}> Delete Post
                                    </button> : ''
                                }
                            </div>
                        )
                    })}
                <br/>
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}

// Export query using withQuery
export default withQuery(props => {
        return PostListQuery.clone({
            options: {
                sort: {createdAt: -1},
            }
        });
    },
    { reactive: true }
)(PostList);

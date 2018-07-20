import React from 'react';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }

    handleDelete = (postId) => {
        Meteor.call('post.remove', postId);
        Meteor.call('comment.removeAll', postId);
        alert("post and link comments deleted");
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;

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
                                <p>Post title: {post.title}, Post Description: {post.description}
                                    View: {post.views} Total Comments: {post.count} </p>
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                                {/* Add post view button */}
                                <button onClick={() => {
                                    history.push("/posts/view/" + post._id)
                                }}> View post
                                </button>
                                { Meteor.userId() &&  ( Meteor.userId() === post.userId )  ?
                                    <button onClick={() => {
                                        this.handleDelete(post._id)
                                    }}> Delete Post
                                    </button> : ''
                                }
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}

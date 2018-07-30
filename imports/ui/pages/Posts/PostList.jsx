// Import package
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import PostListQuery from '/imports/api/posts/postListQuery';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.handleNavigation = this.handleNavigation.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // Delete post and linked comments
    handleDelete = (event) => {
        const postId = event.target.dataset.id;
        // Delete linked comments
        Meteor.call('comment.removeAll', postId);
        // Delete post
        Meteor.call('post.remove', postId);
        alert("post deleted");
    }

    handleNavigation(event){
        const {history} = this.props;
        const type = event.target.dataset.type;
        const id = event.target.dataset.id;
        const url = {
            edit: "/posts/edit/" + id,
            view: "/posts/view/" + id,
            new: "/posts/create"
        };
        history.push(url[type]);
    }

    render() {
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
                                <p>
                                    Post id: {post._id} <br/>
                                    Post title: {post.title} <br/>
                                    Post Description: {post.description} <br/>
                                    View: {post.views} <br/>
                                    Total Comments: {post.comments? post.comments.length : 0}
                                </p>
                                { Meteor.userId() &&  ( Meteor.userId() === post.userId )  ?
                                    <button onClick={this.handleNavigation} data-id={post._id} data-type="edit">
                                        Edit post
                                    </button> : ''
                                }

                                {/* Add post view button */}
                                <button onClick={this.handleNavigation} data-id={post._id} data-type="view">
                                    View post
                                </button>

                                { Meteor.userId() &&  ( Meteor.userId() === post.userId )  ?
                                    <button onClick={this.handleDelete} data-id={post._id}>
                                        Delete Post
                                    </button> : ''
                                }
                            </div>
                        )
                    })}
                <br/>
                <button onClick={this.handleNavigation} data-type="new">
                    Create a new post
                </button>
            </div>
        )
    }
}

// Export query using withQuery
export default withQuery(() => {
    return PostListQuery.clone({
        options: {
            sort: {createdAt: -1},
        }
    });
},
{ reactive: true }
)(PostList);


// Define history, data propsType validation
PostList.propTypes = {
    history: PropTypes.object,
    data: PropTypes.array,
};
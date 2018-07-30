// Import package
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';

class PostListReactive extends React.Component {
    constructor() {
        super();
        this.handleNavigation = this.handleNavigation.bind(this);
    }

    handleNavigation(event){
        const {history} = this.props;
        const type = event.target.dataset.type;
        const id = event.target.dataset.id;
        const url = {
            edit: "/posts/edit/" + id,
            new: "/posts/create"
        };
        history.push(url[type]);
    }

    render() {
        const { posts } = this.props;

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
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <button onClick={this.handleNavigation} data-id={post._id} data-type="edit">
                                    Edit post
                                </button>
                            </div>
                        )
                    })
                }

                <button onClick={this.handleNavigation} data-type="new">
                    Create a new post
                </button>
            </div>
        )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        ...props
    };
})(PostListReactive);

// Define history, data propsType validation
PostListReactive.propTypes = {
    history: PropTypes.object,
    posts: PropTypes.array,
};
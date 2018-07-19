import React from 'react';
import moment from 'moment';

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

    render() {
        const {post} = this.state;
        const {history} = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <div key={post._id}>
                    <p>Post id: {post._id} </p>
                    <p>Post title: {post.title}, Post Description: {post.description} </p>
                    <p>Post type: {post.type} </p>
                    <p>Post Created At:
                        {post.createdAt ? moment(post.createdAt).format("YYYY-MM-DD hh:mm") : ''}
                    </p>
                    <p>Page View Count: {post.views} </p>
                </div>
                <button onClick={() => history.push('/posts')}>Back to posts</button>
            </div>
        );
    }
}

// Import package
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, LongTextField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this.handleNavigation = this.handleNavigation.bind(this);
    }

    handleNavigation(event){
        const {history} = this.props;
        let type = event.target.dataset.type;
        // Create url
        let url = { back: "/posts" };
        // Push url in history
        history.push(url[type]);
    }

    componentDidMount() {
        Meteor.call('post.edit.get', this.props.match.params._id, (err, post) => {
            // Set post data in state
            this.setState({post});
        });
    }

    // On submit meteor call and pass data as arguments
    submit = (post) => {
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    };

    render() {
        {/*const {history} = this.props;*/}
        const {post} = this.state;

        // Show loading till post contain empty data
        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    {/* Add new field post type */}
                    <AutoField name="type" />
                    <button type='submit'>Edit post</button>
                    <button onClick={this.handleNavigation} data-type="back">
                        Back to posts
                    </button>
                    {/*<button onClick={() => history.push('/posts')}>Back to posts</button>*/}
                </AutoForm>
            </div>
        )
    }
}

// Define history propsType validation
PostEdit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            _id: PropTypes.string.isRequired,
        }),
    }),
};
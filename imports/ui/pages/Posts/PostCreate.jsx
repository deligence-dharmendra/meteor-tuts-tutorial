// Import package
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, LongTextField } from 'uniforms-unstyled';

// Import Schema
import PostSchema from '/db/posts/schema';

// Create and export component
export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.handleNavigation = this.handleNavigation.bind(this);
    }

    handleNavigation(event){
        const {history} = this.props;
        let type = event.target.dataset.type;

        // Create url
        let url = {
            back: "/posts"
        };
        // Push url in history
        history.push(url[type]);
    }

    // On submit meteor call
    submit (post) {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    }

    render() {
        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    {/* Add new field post type */}
                    <AutoField name="type"/>
                    <button type='submit'>Add post</button>

                    <button onClick={this.handleNavigation} data-type="back">
                        Back to posts
                    </button>
                </AutoForm>
            </div>
        )
    }
}

// Define history propsType validation
PostCreate.propTypes = {
    history: PropTypes.object,
};
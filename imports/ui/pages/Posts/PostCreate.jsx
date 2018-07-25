import React from 'react';
import { AutoForm, AutoField, LongTextField } from 'uniforms-unstyled';

// Import Schema
import PostSchema from '/db/posts/schema';

// Create and export component
export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    // On submit meteor call
    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };

    render() {
        // Store props in history
        const {history} = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    {/* Add new field post type */}
                    <AutoField name="type"/>
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

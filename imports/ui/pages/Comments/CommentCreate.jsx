// Import meteor package
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { AutoForm, LongTextField, HiddenField } from 'uniforms-unstyled';

// Import schema
import CommentSchema from '/db/comments/schema';

// Create and export Component
export default class CommentCreate extends React.Component {
    constructor() {
        super();
        let formRef;
    }

    submit = (comment) => {
        if (!Meteor.user()) {
            return alert("please login first!");
        }

        Meteor.call('comment.create', comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
        this.formRef.reset();
    };

    render() {
        // Get Post Id
        const postId = this.props.postId;

        return (
            <div className="comment">
                <p>Add New Comments</p>
                <AutoForm ref={ref => this.formRef = ref} onSubmit={this.submit} schema={CommentSchema}>
                    <LongTextField name="text"/>
                    {/* Pass post id as a hidden field */}
                    <HiddenField name="postId" value={postId}/>
                    <button type='submit'>Add comment</button>
                </AutoForm>
            </div>
        );
    }
}
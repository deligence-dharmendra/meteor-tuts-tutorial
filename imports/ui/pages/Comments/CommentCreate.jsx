// Import meteor package
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { AutoForm, LongTextField, HiddenField, ErrorsField } from 'uniforms-unstyled';

// Import schema
import CommentSchema from '/db/comments/schema';

// Create and export Component
export default class CommentCreate extends React.Component {
    constructor() {
        super();
        this.formRef = null;
        this.formRef = React.createRef();
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
        this.formRef.current.reset();
    }

    render() {
        // Get Post Id
        const postId = this.props.postId;

        return (
            <div className="comment">
                <p>Add New Comments</p>
                <AutoForm ref={this.formRef} onSubmit={this.submit} schema={CommentSchema}>
                    <ErrorsField/>

                    <LongTextField name="text" placeholder="Type your comment here"/>
                    {/* Pass post id as a hidden field */}
                    <HiddenField name="postId" value={postId}/>
                    <button type='submit'>Add comment</button>
                </AutoForm>
            </div>
        );
    }
}

// Define postId props validation
CommentCreate.propTypes = {
    postId: PropTypes.string.isRequired,
};
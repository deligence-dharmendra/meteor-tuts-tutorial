// Import meteor package
import { Meteor } from 'meteor/meteor';

// Import PostService
import CommentService from '/imports/api/comments/services/CommentService.js';

Meteor.methods({
    'comment.create'(comment) {
        // Throw error if user not login
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        const userId = this.userId;

        return CommentService.createComment(userId, comment);
    },

    'comment.remove' (_id) {
        // Throw error if user not login
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        // Update service call
        return CommentService.removeComment(_id);
    },

    'comment.get' (_id) {
        const comment = CommentService.findOneComment(_id);

        // Return comment
        return comment;
    },

    'comment.removeAll' (postId){
        // Throw error if user not login
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        // Remove all comment belong to post id
        return CommentService.removeAllCommentsByPostId(postId);
    },
});
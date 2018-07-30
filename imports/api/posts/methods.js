// Import meteor package
import { Meteor } from 'meteor/meteor';

// Import PostService
import PostService from '/imports/api/posts/services/PostService.js';

// Meteor method
Meteor.methods({
    'post.create' (post) {
        // Throw error if user not login
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        const userId = this.userId;

        // Return post id
        return PostService.createPost(userId, post);
    },

    'post.edit' (_id, post) {
        // Throw error if user not login
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        // Update service call
        PostService.updatePost(_id, post);
    },

    'post.remove' (_id) {
        // Throw error if user not login
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        // Update service call
        PostService.removePost(_id);
    },

    'post.edit.get' (_id) {

        const post = PostService.findOnePost(_id);

        // Return post result
        return post;
    },

    'post.updateViewCount' (_id) {

        // Update service call
        const updateView =  PostService.updateViewCountPost(_id);

        // Return result
        return updateView;
    },
});
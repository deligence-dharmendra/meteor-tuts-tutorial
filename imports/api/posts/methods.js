// Import meteor package
import { Meteor } from 'meteor/meteor'

// Import collection
import { Posts } from '/db';

Meteor.methods({
    'post.create'(post) {
        Posts.insert(post);
    },

    'post.edit' (_id, post) {
        // Update post data
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type,
            }
        });
    },

    'post.remove' (_id) {
        // Remove post
        Posts.remove(_id);
    },

    'post.edit.get' (_id) {
        // Return post result
        return Posts.findOne(_id);
    },

    'post.updateViewCount' (_id) {
        // Update view count
        const result = Posts.update(_id, {
            $inc: {
                views: 1,
            },
        });
        // Return result
        return result;
    },
});

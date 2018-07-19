import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        Posts.insert(post);
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type,
            }
        });
    },

    'post.remove' (_id) {
        Posts.remove(_id);
    },

    'post.get' (_id) {
        // Increment post views count before get data from db.
        Posts.update(_id, {
            $inc: {
                views: 1,
            },
        });

        return Posts.findOne(_id);
    }
});
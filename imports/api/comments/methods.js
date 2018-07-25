// Import meteor package
import { Meteor } from 'meteor/meteor';

// Import collection
import { Comments } from '/db';

Meteor.methods({
    'comment.create'(comment) {
        Comments.insert(comment);
    },

    'comment.remove' (_id) {
        Comments.remove(_id);
    },

    'comment.get' (_id) {
        return Comments.findOne(_id);
    },

    'comment.removeAll' (postId){
        // Remove all comment belong to post id
        Comments.remove({postId});
    },
});

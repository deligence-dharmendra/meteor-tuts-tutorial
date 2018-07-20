import {Meteor} from 'meteor/meteor';
import {Comments, Users} from '/db';

Meteor.methods({
    'comment.create'(comment) {
        Comments.insert(comment);
    },

    'comment.list' (postId) {
        const CommentsResult = Comments.find({postId, userId: { $exists: true }}).fetch();
        const result = CommentsResult.map(function(element) {
            element.email = Users.findOne({_id: element.userId}).emails[0].address;
            return element;
        });

        return result;
    },

    'comment.remove' (_id) {
        Comments.remove(_id);
    },

    'comment.get' (_id) {
        return Comments.findOne(_id);
    },

    'comment.removeAll' (postId){
        Comments.remove({postId});
    },
});
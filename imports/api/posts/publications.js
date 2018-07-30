// Import package
import {Meteor} from "meteor/meteor";

// Import collection
import {Posts} from '/db';

Meteor.publish('posts', function() {
    return Posts.find();
});
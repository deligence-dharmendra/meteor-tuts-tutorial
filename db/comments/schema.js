// Meteor packages imports
import { Meteor } from 'meteor/meteor';

import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    text: String,
    userId: {
        type: String,
        optional: true,
        autoValue () {
            let userId;
            if (this.isInsert) {
                userId = this.value || Meteor.userId();
            }
            return userId;
        },
    },
    postId: {
        type: String,
        optional: true,
    },
    createdAt: {
        type: Date,
        optional: true,
        autoValue () {
            let value;
            if (this.isInsert) {
                value = new Date();
            } else if (this.isUpsert) {
                value = { $setOnInsert: new Date() };
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
            return value;
        },
    },
});
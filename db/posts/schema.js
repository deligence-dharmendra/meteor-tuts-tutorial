// Import simple schema
import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
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
    views: {
        type: Number,
        defaultValue: 0,
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
    type: {
        type: String,
        optional: true,
        label: 'Select Post Type',
        allowedValues: [
            'Nature',
            'Psychology',
            'Music',
            'Programming',
            'Project Management',
            'Other',
        ],
    },
});

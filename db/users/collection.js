// Import meteor package
import { Meteor } from 'meteor/meteor';
import UserSchema from './schema';
const Users = Meteor.users;

// Attach collection to schema
Users.attachSchema(UserSchema);

export default Users;
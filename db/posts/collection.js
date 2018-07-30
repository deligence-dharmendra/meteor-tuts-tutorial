// Import meteor package
import { Mongo } from "meteor/mongo";
import PostSchema from './schema'

// Create collection
const Posts = new Mongo.Collection('posts');

// Attach collection to schema
Posts.attachSchema(PostSchema);

export default Posts;
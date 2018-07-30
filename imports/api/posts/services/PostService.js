// Import collection
import { Posts } from '/db';

class PostService {
    static createPost(userId, post) {
        
        post.userId = userId;
        
        const postId = Posts.insert(post);
        
        return postId;
    }

    static updatePost(_id, post) {
        // Update post data
        Posts.update({_id, userId: this.userId}, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type,
            }
        });
    }

    static removePost(_id) {
        // Remove post
        Posts.remove({_id, userId: this.userId});
    }

    static updateViewCountPost(_id) {
        // Update view count
        const updateView = Posts.update(_id, {
            $inc: {
                views: 1,
            },
        });

        // Return result
        return updateView;
    }

    static findOnePost(_id) {
        // Update view count
        return Posts.findOne(_id);
    }
}

export default PostService;
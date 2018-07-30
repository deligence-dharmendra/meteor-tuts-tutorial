// Import collection
import { Comments } from '/db';

class CommentService {
    static createComment(userId, comment) {

        comment.userId = userId;
        
        const commentId =  Comments.insert(comment);

        // Return commentId
        return commentId;
    }

    static removeComment(_id) {
        // Remove comment
        return Comments.remove(_id);
    }

    static removeAllCommentsByPostId(postId) {
        // Remove comments
        const comment = Comments.remove({postId});
        
        // Return status
        return comment;
    }

    static findOneComment(_id) {
        // Update view count
        return Comments.findOne(_id);
    }
}

export default CommentService;
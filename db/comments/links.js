// Import collection
import { Comments, Users, Posts } from '/db';

// Add grapher link
Comments.addLinks({
    user: {
        type: 'one',
        collection: Users,
        field: 'userId',
        index: true,
    },
    post: {
        type: 'one',
        collection: Posts,
        field: 'postId',
        index: true,
    },
});

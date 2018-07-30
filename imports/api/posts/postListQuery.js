// Import collection
import { Posts } from '/db';

// Create nad Export query
export default Posts.createQuery('postList', {
    $options: {createdAt: -1},
    title: 1,
    views: 1,
    userId: 1,
    description: 1,
    comments: {
        text: 1,
        user: {
            emails: {
                address: 1,
            },
        },
    },
});
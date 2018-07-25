// Import collection
import { Posts } from '/db';

// Create and Export post data with all related comments
export default Posts.createQuery('postWithCommentList', {
    $filter({filters, options, params}) {
        filters._id = params._id;
    },
    title: 1,
    createdAt: 1,
    views: 1,
    description: 1,
    type: 1,
    userId: 1,
    owner: {
        email: 1,
    },
    comments: {
        $options: {sort: {createdAt: -1}},
        text: 1,
        postId: 1,
        userId: 1,
        email:1,
        createdAt: 1,
        user: {
			email: 1,
        },
    },
});

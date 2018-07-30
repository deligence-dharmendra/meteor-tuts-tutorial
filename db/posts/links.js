// Import collection
import { Comments, Users, Posts } from '/db';

// Add grapher link
Posts.addLinks({
    owner: {
        type: 'one',
        collection: Users,
        field: 'userId',
        index: true
    },
    comments: {
        collection: Comments,
        inversedBy: 'post'
    }
});

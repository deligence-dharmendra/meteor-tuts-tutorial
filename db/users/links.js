// Import collection
import { Comments, Users, Posts } from '/db';

// Add grapher link
Users.addLinks({
    posts: {
        inversedBy: 'owner',
        collection: Posts,
    },
    comments: {
        inversedBy: 'user',
        collection: Comments,
    },
});

// Create reducer
Users.addReducers({
    email: {
        body: {
            emails: 1,
        },
        reduce(object) {
            return object.emails[0].address;
        }
    }
});

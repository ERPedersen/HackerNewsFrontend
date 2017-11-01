import {User} from './user';

export class CommentSubmission {
    constructor(
        public user_ref: number,
        public post_ref: number,
        public comment_ref: number,
        public content: string) {}
}


export class Comment {
    id: number;
    user_ref: number;
    post_ref: number;
    comment_ref: number;
    content: string;
    karma: number;
    spam: boolean;
    created_at: string;
    author: User;
    my_vote: number;
}

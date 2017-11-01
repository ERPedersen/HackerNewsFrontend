import {Author} from './author';

export class Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    domain: string;
    url: string;
    created_at: string;
    spam: boolean;
    karma: number;
    author: Author;
    my_vote: number;
}

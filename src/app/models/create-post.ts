export class CreatePost {
    type: string;
    title: string;
    url: string;
    content: string;

    constructor(type: string, title: string, url: string, content: string) {
        this.type = type;
        this.title = title;
        this.url = url;
        this.content = content;
    }
}
export class Film {

    public title: string;
    public desc: string;
    public status: string;
    public score: number;

    constructor(title: string, desc: string, status: string, score: number) {
        this.title = title;
        this.desc = desc;
        this.status = status;
        this.score = score;
     }
}

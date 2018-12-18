export class Film {

    public title: string;
    public desc: string;
    public status: string;
    public score: number;
    public date: Date;
    public fav: boolean;

    constructor(title: string, desc: string, status: string, date: Date, score: number, fav: boolean) {
        this.title = title;
        this.desc = desc;
        this.status = status;
        this.date = date;
        this.score = score;
        this.fav = fav;
     }
}

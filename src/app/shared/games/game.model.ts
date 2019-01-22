export class Game {

    public title: string;
    public platform: string;
    public desc: string;
    public status: string;
    public score: number;
    public start_date: Date;
    public finish_date: Date;
    public completion: number;
    public fav: boolean;
    public image: string;

    constructor(title: string, platform: string, desc: string, status: string, score: number, 
        start_date: Date, finish_date: Date, completion: number, fav: boolean, image: string) {
        this.title = title;
        this.platform = platform;
        this.desc = desc;
        this.status = status;
        this.score = score;
        this.start_date = start_date;
        this.finish_date = finish_date;
        this.completion = completion;
        this.fav = fav;
        this.image = image;
     }
}

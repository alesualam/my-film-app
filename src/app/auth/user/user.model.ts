export class User {

    public username: string;
    public bio: string;
    public birth: Date;
    public avatar: string;
    public film_objective: number;

    constructor(username: string, bio: string, birth: Date, avatar: string, film_objective: number) {
        this.username = username;
        this.bio = bio;
        this.birth = birth;
        this.avatar = avatar;
        this.film_objective = film_objective;
     }
}
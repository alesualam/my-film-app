export class User {

    public username: string;
    public bio: string;
    public birth: Date;
    public avatar: string;

    constructor(username: string, bio: string, birth: Date, avatar: string) {
        this.username = username;
        this.bio = bio;
        this.birth = birth;
        this.avatar = avatar;
     }
}
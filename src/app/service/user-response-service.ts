import { Injectable } from "@angular/core"; 
@Injectable({
    providedIn: 'root'
})

export class UserReponse{
    public userName!: string;
    public password!: string;
    public emailAddress!: string;

    constructor(){}
}
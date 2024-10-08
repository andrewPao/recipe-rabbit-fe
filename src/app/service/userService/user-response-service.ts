import { Injectable } from "@angular/core"; 
@Injectable({
    providedIn: 'root'
})

export class UserResponse{
    public id!: number;
    public name!: string;
    public password!: string;
    public emailAddress!: string;
    public phoneNumber!: string;
    public role!: string;

    constructor(){}
}
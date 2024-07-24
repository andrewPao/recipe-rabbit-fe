import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";
import { UserResponse } from "./user-response-service";


@Injectable({
    providedIn:'root'
})

export class UserService{
    private apiServerUrl =  environment.apiUrl;
    
    constructor(private http : HttpClient){
        
    }

    public getUser(): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/user/findAll`);
    }

    public addUser(userResponse: UserResponse):Observable<any>{
        return this.http.post<UserResponse>(`${this.apiServerUrl}/user/add`, userResponse, { observe: 'response' });
    }
    
    public loginUser(username: string, password:string){
        const body = { username: username, password: password };
        return this.http.post<any>(`${this.apiServerUrl}/user/login`, body, { observe: 'response'});
    }
}
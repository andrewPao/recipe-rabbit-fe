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

    public getUserList(): Observable<any>{
        return this.http.get<any>(`${this.apiServerUrl}/user/findAll`);
    }

    public getSingleUser(username: string, password: string):Observable<any>{
        const body = { username: username, password: password };
        return this.http.post<any>(`${this.apiServerUrl}/user/findSingleUser`, body, { observe:'response'});
    }

    public addUser(userResponse: UserResponse):Observable<any>{
        return this.http.post<any>(`${this.apiServerUrl}/user/add`, userResponse, { observe: 'response' });
    }
    
    public loginUser(username: string, password:string):Observable<any>{
        const body = { username: username, password: password };
        return this.http.post<any>(`${this.apiServerUrl}/user/login`, body, { observe: 'response'});
    }

    public deleteUser(id: number):Observable<any>{
        return this.http.delete<any>(`${this.apiServerUrl}/user/delete/${id}`, {observe:'response'});
    }

    public updateUser(userResponse: UserResponse){
        return this.http.put<any>(`${this.apiServerUrl}/user/update`, userResponse, { observe: 'response' });
    }
}
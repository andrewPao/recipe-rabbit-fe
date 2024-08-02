import { Injectable } from "@angular/core";
import { UserResponse } from "./service/userService/user-response-service";
import { UserService } from "./service/userService/user.service";
import { SharedVar } from "./SharedVar";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SharedMethod{

    private userResponseSubject = new BehaviorSubject<any>(null);
    userResponse$ = this.userResponseSubject.asObservable();

    constructor(
        public userResponse: UserResponse,
        private userService: UserService,
        public sharedVar: SharedVar
    
      ) { }
    
    getUserList(){
        this.userService.getUserList().subscribe((data: any) => {
            this.sharedVar.userList = data;
            console.log(this.sharedVar.userList);
          });
    }

    getSingleUser():void {
        this.userService.getSingleUser(this.sharedVar.loginUsername, this.sharedVar.loginPassword).subscribe((response:any)=>{
            this.userResponseSubject.next(response.body);
        })
    }

    fieldEmptyValidtion(): boolean {
        let fieldIsEmpty = true;
        if (this.isStringNonEmpty(this.userResponse.name) && this.isStringNonEmpty(this.userResponse.emailAddress)
          && this.isStringNonEmpty(this.userResponse.password) && this.isStringNonEmpty(this.userResponse.phoneNumber)) {
          fieldIsEmpty = false;
        }
        return fieldIsEmpty;
      }
    
      isStringNonEmpty(value: string): boolean {
        return value != null ? value.trim().length > 0: false;
      }

      resetSignUpForm(){
        this.userResponse.name = '';
        this.userResponse.password = '';
        this.userResponse.emailAddress = '';
        this.userResponse.phoneNumber = '';
        this.sharedVar.confirmInputPassword = '';
       
    }

    resetLogin(){
        this.sharedVar.loginUsername = '';
        this.sharedVar.loginPassword = '';
      }
    
      resetMessage(){
        this.sharedVar.errorMsg = '';
        this.sharedVar.successMsg = '';
      }
}
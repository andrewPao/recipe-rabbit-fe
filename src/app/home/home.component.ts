import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { UserResponse } from '../service/userService/user-response-service';
import { UserService } from '../service/userService/user.service';
import { SharedVar } from '../SharedVar';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: any
  response: any;
  signUpButton: boolean = false;
  loginButton: boolean = false;
  confirmPassword!: string;
  errorMsg!: string;
  successMsg!: string;
  loginUsername: any;
  loginPassword: any;

  constructor(
    public userResponse: UserResponse,
    private userService: UserService,
    public sharedVar: SharedVar,

  ) { }

  ngOnInit() {

    this.userService.getUser().subscribe((data: any) => {
      this.sharedVar.userList = data;
      console.log(this.sharedVar.userList);
    });

  }

  signUpButtonTrigger() {
    this.signUpButton = true;
    this.loginButton = false;
  }

  loginButtonTrigger() {
    this.loginButton = true;
    this.signUpButton = false;
  }

  onSubmit() {
    if (this.userResponse.password != this.confirmPassword) {
      this.errorMsg = this.sharedVar.mismatchPassword;
      return;
    } else {
      this.validation();
    }
  }

  validation() {
    if (!this.fieldEmptyValidtion()) {
      const userExists = this.sharedVar.userList.some(user => user.emailAddress == this.userResponse.emailAddress);

      if (userExists) {
        this.errorMsg = this.sharedVar.existedEmail;
      } else {
        this.userService.addUser(this.userResponse).subscribe((data: any) => {
          this.response = data as any;
          if (this.response.status == 201) {
            this.successMsg = this.sharedVar.createdUser;
            this.errorMsg = "";
            this.loginUsername = this.userResponse.name;
            this.loginPassword = this.userResponse.password;
            
            this.loginButtonTrigger();

          }
        })
      }
    } else {
      this.errorMsg = "Please fill in all fields"
    }
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

  loginUser(){
    this.userService.loginUser(this.loginUsername, this.loginPassword).subscribe((response: any) => {
      console.log(response);
          if(response.body.message == 'success'){
            this.successMsg = this.sharedVar.loginSuccess;
            this.errorMsg = "";
      
          }else if(response.body.message == 'failed'){
            this.errorMsg= this.sharedVar.loginFailed;
            this.successMsg = "";
          }
    });
  }

}

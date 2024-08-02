import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { UserResponse } from '../service/userService/user-response-service';
import { UserService } from '../service/userService/user.service';
import { SharedVar } from '../SharedVar';
import { SharedMethod } from '../SharedMethod';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { UpdateFormModalComponent } from '../modal/update-form-modal/update-form-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminPageComponent, UpdateFormModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: any
  response: any;
  signUpButton: boolean = false;
  loginButton: boolean = false;
  loggedInButton: boolean = false;
  manageAccountButton: boolean = false;
  adminPage: boolean = false;
  
  

  constructor(
    public userResponse: UserResponse,
    private userService: UserService,
    public sharedVar: SharedVar,
    public sharedMethod:SharedMethod

  ) { }

  ngOnInit() {
    this.sharedMethod.getUserList();

  }

  signUpButtonTrigger() {
    this.sharedMethod.resetLogin();
    this.sharedMethod.resetMessage();
    this.signUpButton = true;
    this.loginButton = false;
  }

  loginButtonTrigger() {
    this.sharedMethod.resetSignUpForm();
    this.sharedMethod.resetMessage();
    this.loginButton = true;
    this.signUpButton = false;
   
  }

  logoutButtonTrigger(){
    this.loggedInButton = false;
    this.adminPage = false;
    this.manageAccountButton = false; 
    this.sharedMethod.resetMessage();
    this.sharedMethod.resetLogin();
    this.sharedMethod.resetSignUpForm();
   
  }

  editUserForm(){
    this.manageAccountButton = true;
  }

  onSubmit() {
    if (this.userResponse.password != this.sharedVar.confirmInputPassword) {
      this.sharedVar.errorMsg = this.sharedVar.mismatchPassword;
      return;
    } else {
      this.validation();
    }
  }

  validation() {
    if (!this.sharedMethod.fieldEmptyValidtion()) {
      const userExists = this.sharedVar.userList.some(user => user.emailAddress == this.userResponse.emailAddress);

      if (userExists) {
        this.sharedVar.errorMsg = this.sharedVar.existedEmail;
      } else {
        this.userService.addUser(this.userResponse).subscribe((data: any) => {
          this.response = data as any;
          if (this.response.status == 201) {
            this.sharedVar.successMsg = this.sharedVar.createdUser;
            this.sharedVar.errorMsg = "";
            this.sharedVar.loginUsername = this.userResponse.name;
            this.sharedVar.loginPassword = this.userResponse.password;
            
            this.loginButtonTrigger();
            this.sharedMethod.resetSignUpForm();

          }
        })
      }
    } else {
      this.sharedVar.errorMsg = "Please fill in all fields"
    }
  }

  loginUser(){
    this.userService.loginUser(this.sharedVar.loginUsername, this.sharedVar.loginPassword).subscribe((response: any) => {
      console.log(response);
          if(response.body.message =='admin'){
            this.sharedMethod.resetMessage();
            this.loggedInButton = true;
            this.adminPage = true;
            this.sharedMethod.resetLogin();

          }else if(response.body.message == 'success'){
            this.sharedVar.errorMsg = "";
            this.loggedInButton = true;
      
          }else if(response.body.message == 'failed'){
            this.sharedVar.errorMsg= this.sharedVar.loginFailed;
            this.sharedVar.successMsg = "";
          }
    });
  }

 

 

}

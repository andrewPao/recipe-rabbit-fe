import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserReponse } from '../service/user-response-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  signUpButton: boolean = false;
  loginButton: boolean = false;
  confirmPassword!: string;
  errorMsg!: string;

  constructor(public userResponse: UserReponse){
    
  }
  
  ngOnInit(){

    this.userResponse.userName = "JohnDoe";
    this.userResponse.password = "password123";
    this.userResponse.emailAddress = "johndoe@example.com";
    
    console.log(this.userResponse.userName); // Output: JohnDoe
    console.log(this.userResponse.emailAddress); 
    
  }

  signUpButtonTrigger(){
    this.signUpButton = true;
    this.loginButton = false;
  }

  loginButtonTrigger(){
    this.loginButton = true;
    this.signUpButton = false;
  }

  onSubmit() {
    
    if(this.userResponse.password != this.confirmPassword){
      this.errorMsg = "Password did not match"
    }else{
      console.log('User Name:', this.userResponse.userName);
      console.log('Password:', this.userResponse.password);
      console.log('confirmPassword', this.confirmPassword);
      console.log('Email Address:', this.userResponse.emailAddress);
    }
  }
  
    
  
}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  signUpButton: boolean = false;
  loginButton: boolean = false;

  constructor(){
    
  }
  
  ngOnInit(){

  }

  signUpButtonTrigger(){
    this.signUpButton = true;
    this.loginButton = false;
  }

  loginButtonTrigger(){
    this.loginButton = true;
    this.signUpButton = false;
  }
  
    
  
}

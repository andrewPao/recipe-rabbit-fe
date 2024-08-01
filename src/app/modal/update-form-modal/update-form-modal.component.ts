import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from '../../service/userService/user-response-service';
import { UserService } from '../../service/userService/user.service';
import { SharedVar } from '../../SharedVar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedMethod } from '../../SharedMethod';

@Component({
  selector: 'app-update-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-form-modal.component.html',
  styleUrl: './update-form-modal.component.css'
})
export class UpdateFormModalComponent implements OnInit{
  @Input() manageAccountButton!: boolean;

  confirmPassword:string='';
  errorMsg:string='';
  userResponse: any;

  constructor(
    private userService: UserService,
    public sharedVar: SharedVar,
    public sharedMethod: SharedMethod

  ) { }

  ngOnInit(){

    this.sharedMethod.getUserList();
    console.log(this.manageAccountButton + ", " + this.sharedVar.loginUsername + ", " + this.sharedVar.loginPassword);
    this.sharedMethod.getSingleUser();
    this.sharedMethod.userResponse$.subscribe((response: any) => {
      this.userResponse = response;
      console.log(this.userResponse);
    });
  }

  onSubmit(){

  }
}

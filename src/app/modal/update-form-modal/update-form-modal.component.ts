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
export class UpdateFormModalComponent implements OnInit {
  @Input() manageAccountButton!: boolean;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';
  userResponse!: UserResponse;

  constructor(
    private userService: UserService,
    public sharedVar: SharedVar,
    public sharedMethod: SharedMethod

  ) { }

  ngOnInit() {
    this.sharedMethod.getUserList();
    this.assignedUserReponseToObservable();
  }

  updateUser() {

    if (this.oldPassword == this.userResponse.password) {
      if (this.newPassword == this.confirmPassword) {
        this.sharedVar.loginUsername = this.userResponse.name;
        this.sharedVar.loginPassword = this.confirmPassword;
        this.userResponse.password = this.confirmPassword;

        this.userService.updateUser(this.userResponse).subscribe((response: any) => {
          console.log(response);
          this.sharedVar.successMsg = this.sharedVar.updatedCredentialSuccess;
          this.sharedVar.errorMsg = '';
          this.assignedUserReponseToObservable();
        })


      } else {
        this.sharedVar.errorMsg = this.sharedVar.mismatchPassword;
      }

    } else {
      this.sharedVar.errorMsg = this.sharedVar.incorrectOldPassword;
    }
  }

  assignedUserReponseToObservable() {
    this.sharedMethod.getSingleUser();
    this.sharedMethod.userResponse$.subscribe((response: any) => {
      this.userResponse = response;
      console.log(this.userResponse);
    })

  }

}
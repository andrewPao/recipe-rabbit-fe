import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../service/userService/user-response-service';
import { UserService } from '../service/userService/user.service';
import { SharedVar } from '../SharedVar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
searchInput: string = '';
successMsg: string = '';
editingUser!: number ;
updateTrigger : boolean = false;

    constructor(
    public userResponse: UserResponse,
    private userService: UserService,
    public sharedVar: SharedVar

  ) { }

  ngOnInit(){
    this.userService.getUser().subscribe((data: any)=>{
      this.sharedVar.userList = data;
    })
  }

  get filteredUserList() {
    if (!this.searchInput) {
      return this.sharedVar.userList;
    }
    const filter = this.searchInput.toUpperCase();
    return this.sharedVar.userList.filter(user =>
      user.name.toUpperCase().includes(filter) 
    );
  }

  deleteUser(id:number){
    const isConfirmed = window.confirm(this.sharedVar.confirmationMessage);

    if(isConfirmed){
      console.log(id);
      this.userService.deleteUser(id).subscribe((response:any)=>{
        console.log(response);
        if(response.status == 200){
          this.successMsg = this.sharedVar.deletedUser;
          console.log(this.successMsg);
        }
        
        this.userService.getUser().subscribe((data: any)=>{
          this.sharedVar.userList = data;
        })

       
    })
  }
  }

  updateUser(user: UserResponse){
   
  }
}

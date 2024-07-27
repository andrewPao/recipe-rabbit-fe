import { Component } from '@angular/core';
import { UserResponse } from '../service/userService/user-response-service';
import { UserService } from '../service/userService/user.service';
import { SharedVar } from '../SharedVar';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
    constructor(
    public userResponse: UserResponse,
    private userService: UserService,
    public sharedVar: SharedVar

  ) { }

  ngOnInit(){
    
  }
}

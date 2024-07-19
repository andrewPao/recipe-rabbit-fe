import { Injectable } from "@angular/core";
import { UserResponse } from "./service/userService/user-response-service";

@Injectable({
    providedIn: 'root'
})

export class SharedVar{
    //Labels and headers
    public welcomeMessage = "Welcome To Recipe Rabbit";
    public signUp = "Sign Up";
    public login = "Login";
    public username = "Username";
    public password = "Password";
    public confirmPassword = "Confirm Password";
    public email = "Email Address";
    public phoneNumber = "Phone Number"

    //Error Messages
    public mismatchPassword = "Password did not match";
    public existedEmail = "User has already been Registered";

    //Success Messages
    public createdUser = "Account created successfully";

    public userList!: UserResponse[]

}
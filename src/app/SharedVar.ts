import { Injectable } from "@angular/core";
import { UserResponse } from "./service/userService/user-response-service";

@Injectable({
    providedIn: 'root'
})

export class SharedVar{
    //Labels and headers
    public welcomeMessage = "Welcome To Recipe Rabbit";
    public signUp = "Sign Up";
    public login = "Login To Recipe Rabbit";
    public loginButton = "Login";
    public logoutButton = "Log Out";
    public username = "Username";
    public password = "Password";
    public confirmPassword = "Confirm Password";
    public email = "Email Address";
    public phoneNumber = "Phone Number"
    public createAccount = "Create Account";
    public deleteButton = "Delete";
    public updateButton = "Update";

    //Error Messages
    public mismatchPassword = "Password did not match";
    public existedEmail = "User has already been Registered";
    public userNotCreated = "User not found";
    public incorrectLoginCredentials = "Login Unsuccessful";
    public loginFailed = "User does not exist or Incorrect Password";
    public emptyFields = "Please fill in all fields";

    //Success Messages
    public createdUser = "Account created successfully";
    public loginSuccess = "Login Success";
    public deletedUser = "User has been deleted.";

    public userList!: UserResponse[]

}
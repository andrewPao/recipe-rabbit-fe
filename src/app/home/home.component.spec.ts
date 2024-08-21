import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { UserResponse } from '../service/userService/user-response-service';
import { UserService } from '../service/userService/user.service';
import { SharedVar } from '../SharedVar';
import { SharedMethod } from '../SharedMethod';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { UpdateFormModalComponent } from '../modal/update-form-modal/update-form-modal.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let sharedMethodMock: jasmine.SpyObj<SharedMethod>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['addUser', 'loginUser']);
    const sharedMethodSpy = jasmine.createSpyObj('SharedMethod', [
      'getUserList',
      'resetLogin',
      'resetSignUpForm',
      'resetMessage',
      'fieldEmptyValidtion',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        AdminPageComponent,
        UpdateFormModalComponent,
        HomeComponent // Import the standalone component directly here
      ],
      providers: [
        UserResponse,
        SharedVar,
        { provide: UserService, useValue: userServiceSpy },
        { provide: SharedMethod, useValue: sharedMethodSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    sharedMethodMock = TestBed.inject(SharedMethod) as jasmine.SpyObj<SharedMethod>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a call to getUserList()', () => {
    component.ngOnInit();
    expect(sharedMethodMock.getUserList).toHaveBeenCalled();
  });

  it('should trigger sign-up mode when signUpButtonTrigger is called', () => {
    component.signUpButtonTrigger();
    expect(component.signUpButton).toBeTrue();
    expect(component.loginButton).toBeFalse();
    expect(sharedMethodMock.resetLogin).toHaveBeenCalled();
    expect(sharedMethodMock.resetMessage).toHaveBeenCalled();
  });

  it('should trigger login mode when loginButtonTrigger is called', () => {
    component.loginButtonTrigger();
    expect(component.loginButton).toBeTrue();
    expect(component.signUpButton).toBeFalse();
    expect(sharedMethodMock.resetSignUpForm).toHaveBeenCalled();
    expect(sharedMethodMock.resetMessage).toHaveBeenCalled();
  });

  it('should reset on logoutButtonTrigger', () => {
    component.logoutButtonTrigger();
    expect(component.loggedInButton).toBeFalse();
    expect(component.adminPage).toBeFalse();
    expect(component.manageAccountButton).toBeFalse();
    expect(sharedMethodMock.resetMessage).toHaveBeenCalled();
    expect(sharedMethodMock.resetLogin).toHaveBeenCalled();
    expect(sharedMethodMock.resetSignUpForm).toHaveBeenCalled();
  });

  it('should show manage account form when editUserForm is called', () => {
    component.editUserForm();
    expect(component.manageAccountButton).toBeTrue();
  });

  it('should validate and submit the form on successful sign up', () => {
    sharedMethodMock.fieldEmptyValidtion.and.returnValue(false);
    component.sharedVar.userList = [];
    component.userResponse = { emailAddress: 'test@example.com', name: 'test', password: '123456' } as any;
    component.sharedVar.confirmInputPassword = '123456';
    userServiceMock.addUser.and.returnValue(of({ status: 201 }));

    component.onSubmit();

    expect(sharedMethodMock.fieldEmptyValidtion).toHaveBeenCalled();
    expect(userServiceMock.addUser).toHaveBeenCalledWith(component.userResponse);
    expect(component.sharedVar.successMsg).toBe(component.sharedVar.createdUser);
    expect(component.loginButton).toBeTrue();
  });

  it('should show an error when password confirmation does not match', () => {
    component.userResponse.password = 'password';
    component.sharedVar.confirmInputPassword = 'wrongpassword';
    component.onSubmit();
    expect(component.sharedVar.errorMsg).toBe(component.sharedVar.mismatchPassword); // Expect password mismatch error
  });
  
  it('should show an error message when fields are empty', () => {
    sharedMethodMock.fieldEmptyValidtion.and.returnValue(true);
    component.userResponse.password = 'password';
    component.sharedVar.confirmInputPassword = 'password'; // Ensure the passwords match to avoid triggering password validation first
    component.onSubmit();
    expect(component.sharedVar.errorMsg).toBe('Please fill in all fields'); // Expect empty fields error
  });
  
  it('should handle login for admin and regular users', () => {
    component.sharedVar.loginUsername = 'admin';
    component.sharedVar.loginPassword = 'password';
    userServiceMock.loginUser.and.returnValue(of({ body: { message: 'admin' } }));

    component.loginUser();

    expect(component.loggedInButton).toBeTrue();
    expect(component.adminPage).toBeTrue();
    expect(sharedMethodMock.resetMessage).toHaveBeenCalled();
    expect(sharedMethodMock.resetLogin).toHaveBeenCalled();

    userServiceMock.loginUser.and.returnValue(of({ body: { message: 'success' } }));
    component.loginUser();
    expect(component.loggedInButton).toBeTrue();

    userServiceMock.loginUser.and.returnValue(of({ body: { message: 'failed' } }));
    component.loginUser();
    expect(component.sharedVar.errorMsg).toBe(component.sharedVar.loginFailed);
  });
});

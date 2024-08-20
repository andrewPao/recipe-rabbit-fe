import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPageComponent } from './admin-page.component';
import { UserService } from '../service/userService/user.service';
import { SharedVar } from '../SharedVar';
import { SharedMethod } from '../SharedMethod';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock Services
class MockUserService {
  deleteUser(id: number) {
    return of({ status: 200 });  // Simulate successful deletion
  }
}

class MockSharedVar {
  userList = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  confirmationMessage = 'Are you sure you want to delete this user?';
  deletedUser = 'User deleted successfully!';
}

class MockSharedMethod {
  getUserList() { }  // Simulate fetching user list
}

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageComponent,HttpClientTestingModule],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: SharedVar, useClass: MockSharedVar },
        { provide: SharedMethod, useClass: MockSharedMethod },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter user list based on search input', () => {
    component.searchInput = 'John';
    fixture.detectChanges();

    const filteredUsers = component.filteredUserList;
    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers[0].name).toBe('John Doe');
  });

  it('should call deleteUser and update success message on successful deletion', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.userService, 'deleteUser').and.callThrough();
    spyOn(component.sharedMethod, 'getUserList').and.callThrough();

    component.deleteUser(1);
    
    expect(component.userService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.successMsg).toBe('User deleted successfully!');
    expect(component.sharedMethod.getUserList).toHaveBeenCalled();
  });

  it('should not call deleteUser when deletion is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.userService, 'deleteUser').and.callThrough();

    component.deleteUser(1);
    
    expect(component.userService.deleteUser).not.toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateFormModalComponent } from './update-form-modal.component';

describe('UpdateFormModalComponent', () => {
  let component: UpdateFormModalComponent;
  let fixture: ComponentFixture<UpdateFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFormModalComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

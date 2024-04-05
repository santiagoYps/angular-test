// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ButtonComponent } from './button.component';

// describe('ButtonComponent', () => {
//   let component: ButtonComponent;
//   let fixture: ComponentFixture<ButtonComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ButtonComponent]
//     });
//     fixture = TestBed.createComponent(ButtonComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize classes correctly', () => {
    component.type = 'secondary';
    component.size = 'large';
    component.ngOnInit();
    expect(component.classes).toEqual({
      [component.type]: true,
      [component.size]: true
    });
  });
});
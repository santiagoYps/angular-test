// import { InputDirective } from './input.directive';

// describe('InputDirective', () => {
//   it('should create an instance', () => {
//     const directive = new InputDirective();
//     expect(directive).toBeTruthy();
//   });
// });
import { ElementRef, SimpleChange } from '@angular/core';
import { InputDirective } from './input.directive';

class InputDirectiveTest extends InputDirective {
  constructor(el: ElementRef) {
    super(el);
  }  
  getElement(): HTMLInputElement {
    return this.element;
  }

  override validateStatus() {
    super.validateStatus();
  }
  
}

describe('InputDirective', () => {
  let directive: InputDirectiveTest;
  let el: ElementRef;

  beforeEach(() => {
    const element = document.createElement('input');
    el = new ElementRef(element);
    directive = new InputDirectiveTest(el);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add "input" class to the element', () => {
    directive.ngOnInit();

    expect(directive.getElement().classList.contains('input')).toBe(true);
  });

  it('should set the "type" attribute of the element', () => {
    const testType = 'text';
    directive.type = testType;

    directive.ngOnInit();

    expect(directive.getElement().getAttribute('type')).toBe(testType);
  });

  it('should add "invalid" class to the element when "invalid" input is true', () => {
    const testInvalid = true;
    directive.invalid = testInvalid;
    const change = { previousValue: false, currentValue: testInvalid, firstChange: false } as SimpleChange;

    directive.ngOnChanges({ invalid: change });

    expect(directive.getElement().classList.contains('invalid')).toBe(testInvalid);
  });

  it('should remove "invalid" class to the element when "invalid" input is true', () => {
    const testInvalid = false;
    directive.invalid = testInvalid;
    const change = { previousValue: false, currentValue: testInvalid, firstChange: false } as SimpleChange;

    directive.ngOnChanges({ invalid: change });

    expect(directive.getElement().classList.contains('invalid')).toBe(testInvalid);
  });


});
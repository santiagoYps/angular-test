import { Directive, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appInput]'
})
export class InputDirective implements OnInit {

  @Input()
  invalid: boolean = false;

  @Input()
  type!: string ;

  protected element = this.el.nativeElement as HTMLInputElement;

  constructor(private el: ElementRef) { 
    this.element.classList.add('input');
  }

  ngOnInit(): void {
    const typeAttr = document.createAttribute('type');
    typeAttr.value = this.type;
    this.element.attributes.setNamedItem(typeAttr);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['invalid']) {
      this.validateStatus();
    }
  }

  protected validateStatus() {
    this.invalid 
    ? this.element.classList.add('invalid')
    : this.element.classList.remove('invalid');
  }

}

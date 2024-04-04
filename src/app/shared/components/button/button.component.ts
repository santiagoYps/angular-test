import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{

  @Input() 
  type: 'primary' | 'secondary' = 'primary';

  @Input() 
  size: 'normal' | 'large' = 'normal';

  @Input()
  label: string = '';

  classes!: Record<string, boolean>

  constructor() { }

  ngOnInit(): void {
    this.classes = {
      [this.type]: true,
      [this.size]: true
    }
  }


}

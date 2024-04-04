import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input()
  size: 'small' | 'medium' = 'small';

  @Input()
  value: string = '';

  @Input()
  tooltip: boolean = false;

  @Input()
  tooltipText: string = '';

  sizeClasses!: Record<typeof this.size, boolean>

  ngOnInit(): void {
    this.sizeClasses = {
      small: this.size === 'small',
      medium: this.size === 'medium'
    }  
  }

}

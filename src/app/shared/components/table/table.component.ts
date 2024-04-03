import { Component, Input } from '@angular/core';
import { IMAGE_FORMATS } from '@shared/constants/table.constant';
import { Column } from '@shared/types/table.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  cols!: Column[];

  @Input()
  items!: any[];

  isImageUrl(value: unknown): boolean {
    return typeof value === 'string' && IMAGE_FORMATS.includes(value.split('.').pop()?.toLocaleLowerCase()!);
  }

}

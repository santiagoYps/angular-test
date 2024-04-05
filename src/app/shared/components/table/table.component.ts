import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMAGE_FORMATS } from '@shared/constants/table.constant';
import { Column } from '@shared/types/table.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  cols!: Column[];

  @Input()
  items!: any[];

  @Input()
  filterField: string | null = null;

  @Input()
  searchValue: string = '';

  private filterActive = false;
  itemsToShow: any[] = [];

  ngOnInit(): void {
    this.itemsToShow = this.items;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterField']) {
      this.filterActive = !!this.filterField && this.cols.some(col => col.field === changes['filterField'].currentValue);
      console.log("filterActive", this.filterActive);
    }
    if (changes['searchValue']) {
      this.filterItems(changes['searchValue'].currentValue);
    }
  }

  filterItems(value: string): void {
    if (!this.filterActive) return;
    if (value === '') {
      this.itemsToShow = this.items;
      return;
    }
    this.itemsToShow = this.items.filter(item => {
      return item[this.filterField!].toString().toLowerCase().includes(value.toLowerCase());
    });
  }

  isImageUrl(value: unknown): boolean {
    return typeof value === 'string' && IMAGE_FORMATS.includes(value.split('.').pop()?.toLocaleLowerCase()!);
  }



}

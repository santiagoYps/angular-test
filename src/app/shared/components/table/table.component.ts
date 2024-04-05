import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMAGE_FORMATS } from '@shared/constants/table.constant';
import { Column } from '@shared/types/table.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  cols: Column[] = [];

  @Input()
  items: any[] = [];

  @Input()
  filterField: string | null = null;

  @Input()
  searchValue: string = '';

  @Input()
  shownItemsAmount: number[] = [];

  protected filterActive = false;
  itemsToShow: any[] = [];

  amountItemsInput = new FormControl();

  ngOnInit(): void {
    const initialAmount = this.shownItemsAmount.length > 0 ? this.shownItemsAmount[0] : this.items.length;
    this.amountItemsInput.setValue(initialAmount);
    
    this.itemsToShow = this.items;
    this.sliceItems();
    if (this.shownItemsAmount.length > 0){
      this.amountItemsInput.valueChanges.subscribe((value) => {
        this.itemsToShow = this.items;
        this.sliceItems();
      });
    }
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

  sliceItems(): void {
    this.itemsToShow = this.itemsToShow.slice(0, this.amountItemsInput.value);
  }

  filterItems(value: string): void {
    if (!this.filterActive) return;
    if (value === '') {
      this.itemsToShow = this.items;
      this.sliceItems();
      return;
    }
    this.itemsToShow = this.items.filter(item => {
      return item[this.filterField!].toString().toLowerCase().includes(value.toLowerCase());
    });    
    this.sliceItems();
  }

  isImageUrl(value: unknown): boolean {
    return typeof value === 'string' && IMAGE_FORMATS.includes(value.split('.').pop()?.toLocaleLowerCase()!);
  }



}

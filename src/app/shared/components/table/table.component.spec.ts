// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TableComponent } from './table.component';

// describe('TableComponent', () => {
//   let component: TableComponent;
//   let fixture: ComponentFixture<TableComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TableComponent]
//     });
//     fixture = TestBed.createComponent(TableComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TableComponent } from './table.component';
import { Product } from '../../../models/Product';
import { SimpleChange } from '@angular/core';

const products = [
  new Product('1', 'Product 1', 'Description 1', 'logo', new Date(), new Date()),
]

class TableComponentTest extends TableComponent {
  constructor() {
    super();
  }
  get filterActiveVal(){
    return this.filterActive;
  }

  set filterActiveVal(value: boolean){
    this.filterActive = value;
  }
}

describe('TableComponent', () => {
  let component: TableComponentTest;
  let fixture: ComponentFixture<TableComponentTest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponentTest]
    });
    fixture = TestBed.createComponent(TableComponentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize amountItemsInput with the correct value', () => {
    expect(component.amountItemsInput.value).toBe(component.items.length);
  });

  it('should set itemsToShow when amountItemsInput value and slice items', () => {
    const amounts = [5,10]
    component.shownItemsAmount = amounts;
    component.items = products;
    const sliceSpy = jest.spyOn(component, 'sliceItems');

    component.ngOnInit();

    expect(component.amountItemsInput.value).toBe(amounts[0]);
    expect(sliceSpy).toHaveBeenCalledTimes(1);
    expect(component.itemsToShow.length).toBeLessThanOrEqual(component.amountItemsInput.value);
  });

  it('should set filterActive and call filter function', () => {
    const filterField = 'name';
    component.filterField = filterField;
    component.items = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 }
    ];
    component.cols = [
      { field: 'name', header: 'Name', help: false },
      { field: 'age', header: 'Age', help: false }
    ]
    const change = new SimpleChange(null, filterField, true )
    component.ngOnChanges({ filterField: change });

    expect(component.filterActiveVal).toBe(true);

    // test search value change
    component.searchValue = 'J';
    const filterSpy = jest.spyOn(component, 'filterItems');
    const change2 = new SimpleChange('', 'J', false )

    component.ngOnChanges({ searchValue: change2 });

    expect(filterSpy).toHaveBeenCalledTimes(1);
  });

  it('should filter itemsToShow when searchValue changes', () => {
    const filterField = 'name';
    component.filterField = filterField;
    component.filterActiveVal = true;
    component.items = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 }
    ];
    component.itemsToShow = component.items;
    component.searchValue = 'John';
    component.amountItemsInput.setValue(component.items.length);
    const change = new SimpleChange(null, 'John', true )
    const sliceSpy = jest.spyOn(component, 'sliceItems');
    component.ngOnChanges({ searchValue: change });

    expect(component.itemsToShow.length).toBe(1); 
    expect(sliceSpy).toHaveBeenCalledTimes(1);
  });

  it('should not filter itemsToShow when searchValue = "" ', () => {
    component.filterActiveVal = true;
    component.items = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 }
    ];
    component.amountItemsInput.setValue(component.items.length);
    const sliceSpy = jest.spyOn(component, 'sliceItems');

    const change = new SimpleChange(null, '', true )
    component.ngOnChanges({ searchValue: change });

    expect(component.itemsToShow.length).toBe(component.items.length);
  });

  it('should return true for valid image URLs', () => {
    const imageUrl = 'https://example.com/image.jpg';
    expect(component.isImageUrl(imageUrl)).toBe(true);
  });

  it('should return false for invalid image URLs', () => {
    const invalidUrl = 'https://example.com/document.pdf';
    expect(component.isImageUrl(invalidUrl)).toBe(false);
  });
});
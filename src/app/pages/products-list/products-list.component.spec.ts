// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProductsListComponent } from './products-list.component';

// describe('ProductsListComponent', () => {
//   let component: ProductsListComponent;
//   let fixture: ComponentFixture<ProductsListComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ProductsListComponent]
//     });
//     fixture = TestBed.createComponent(ProductsListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ProductsListComponent } from './products-list.component';
import { ProductsService } from '../../services/products.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService = {
    getAllProducts: jest.fn().mockImplementation(() => of([]))
  } 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: ProductsService, useValue: productService }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columns', () => {
    component.initColumns();
    expect(component.cols.length).toBe(5);
  });

  it('should fetch products and populate data', () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: '2022-01-01',
        date_revision: '2022-01-02'
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: '2022-02-01',
        date_revision: '2022-02-02'
      }
    ];
    productService.getAllProducts = jest.fn().mockImplementation(() => of(mockProducts));
    const getAllSpy = jest.spyOn(productService, 'getAllProducts');

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(getAllSpy).toHaveBeenCalled();
    expect(component.data.length).toBe(2);
    expect(component.data[0].name).toBe('Product 1');
    expect(component.data[1].name).toBe('Product 2');
  });

  it('should handle error when fetching products', () => {
    const mockError = 'Error fetching products';
    productService.getAllProducts = jest.fn().mockImplementation(() => throwError(() => new Error(mockError)));
    const getAllSpy = jest.spyOn(productService, 'getAllProducts');
    const consoleSpy = jest.spyOn(console, 'log');

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(getAllSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

  it('should update searchProductValue on input value changes', fakeAsync(() => {
    const valueChangesSpy = jest.spyOn(component.searchProductInput.valueChanges, 'pipe')
    const subscribeSpy = jest.spyOn(component.searchProductInput.valueChanges, 'subscribe')

    component.ngOnInit();
    tick(300);

    component.searchProductInput.setValue('test');
    tick(300);

    expect(valueChangesSpy).toHaveBeenCalled();
    expect(subscribeSpy).toHaveBeenCalled();
    expect(component.searchProductValue).toBe('test');
  }));

  it('should debounce and trim searchProductValue on input value changes', fakeAsync(() => {
    const valueChangesSpy = jest.spyOn(component.searchProductInput.valueChanges, 'pipe')
    const subscribeSpy = jest.spyOn(component.searchProductInput.valueChanges, 'subscribe')

    component.ngOnInit();
    tick(300);

    component.searchProductInput.setValue('       test    ');
    tick(300);

    expect(valueChangesSpy).toHaveBeenCalled();
    expect(subscribeSpy).toHaveBeenCalled();
    expect(component.searchProductValue).toBe('test');
  }));

});
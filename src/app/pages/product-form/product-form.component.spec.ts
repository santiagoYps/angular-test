import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { ProductsService } from '../../services/products.service';
import { IdValidator } from '../../utils/validators/IdValidator';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  let productService = {
    createProduct: jest.fn(),  
  }

  let idValidator = {
    validate: jest.fn().mockImplementation((control: AbstractControl) => of(null)),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ProductFormComponent],
      providers: [
        { provide: ProductsService, useValue: productService },
        { provide: IdValidator, useValue: idValidator }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.alert = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.productForm.valid).toBeFalsy();
    expect(component.id.valid).toBeFalsy();
    expect(component.name.valid).toBeFalsy();
    expect(component.desc.valid).toBeFalsy();
    expect(component.logo.valid).toBeFalsy();
    expect(component.release.valid).toBeFalsy();
    expect(component.review.valid).toBeFalsy();
  });

  it('should enable submit button when the form is valid', () => {
    component.id.setValue('P00001');
    component.name.setValue('Test Product');
    component.desc.setValue('Test Description');
    component.logo.setValue('test.png');
    component.release.setValue('2024-12-12');
    component.review.setValue('2025-12-12');
    fixture.detectChanges();
    expect(component.productForm.valid).toBeTruthy();
  });

  it('should disable submit button when the form is invalid', () => {
    component.id.setValue('');
    component.name.setValue('Test');
    component.desc.setValue('Test Description');
    component.logo.setValue('test.png');
    component.release.setValue('2022-01-01');
    component.review.setValue('2023-01-01');
    expect(component.productForm.valid).toBeFalsy();
  });

  it('should call createProduct method when submit button is clicked', () => {
    component.id.setValue('P00001');
    component.name.setValue('Test Product');
    component.desc.setValue('Test Description');
    component.logo.setValue('test.png');
    component.release.setValue('2024-12-12');
    component.review.setValue('2025-12-12');
    productService.createProduct = jest.fn().mockReturnValue(of({}));
    const createProductServiceSpy = jest.spyOn(productService, 'createProduct')
    component.createProduct();
    expect(createProductServiceSpy).toHaveBeenCalled();

  });

  it('should throw an error when a product is being created', () => {
    component.id.setValue('P00001');
    component.name.setValue('Test Product');
    component.desc.setValue('Test Description');
    component.logo.setValue('test.png');
    component.release.setValue('2024-12-12');
    component.review.setValue('2025-12-12');
    const errorMsg = "Error message"; 
    productService.createProduct = jest.fn().mockReturnValue(throwError(()=> new Error(errorMsg)));
    
    const alertSpy = jest.spyOn(window, 'alert');
    const creationSpy = jest.spyOn(productService, 'createProduct');
    
    component.createProduct();

    expect(creationSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();

  });


  it('should resetForm', () => {
    component.resetForm();
    expect(component.productForm.valid).toBeFalsy();
    expect(component.review.disabled).toBeTruthy();
  });


});
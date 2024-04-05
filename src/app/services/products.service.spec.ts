import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/Product';
import { HttpErrorResponse } from '@angular/common/http';

const mockProduct = new Product(
  '1',
  'Product 1',
  'Description 1',
  'x.png',
  new Date(),
  new Date(),
);

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should check if a product ID exists', () => {
    const mockId = '1';

    service.existsProductId(mockId).subscribe(exists => {
      expect(exists).toBe(true);
    });

    const req = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should create a new product', () => {
    service.createProduct(mockProduct).subscribe(createdProduct => {
      expect(createdProduct).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should handle 400 error when retrieving all products', () => {
    const errorMessage = 'Author Id requerido';
    const mockError = new HttpErrorResponse({ status: 400, statusText: 'Bad Request'});
  
    service.getAllProducts().subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });
  
    const req = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle 400 error when checking if a product ID exists', () => {
    const mockId = '1';
    const errorMessage = 'Id del producto requerido requerido';
    const mockError = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
  
    service.existsProductId(mockId).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });
  
    const req = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 400, statusText: 'Bad Request' });
  });


  it('should handle 206 error when creating a new product', () => {
    
    service.createProduct(mockProduct).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error.message).toBe('Los campos: id, name, description, image, createdDate, modifiedDate,  son obligatorios.');
      }
    });
  
    const req = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush({name: "requerido", id: "requerido"}, { status: 206, statusText: 'Partial Content' });
  });


  it('should handle 400 error when creating a new product', () => {
    
    const errorMessage = 'Bad Request';
  
    service.createProduct(mockProduct).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });
  
    const req = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 400, statusText: 'Bad Request' });
  });


});
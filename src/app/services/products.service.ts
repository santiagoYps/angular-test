import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/Product';
import { catchError, from, retry, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL_BASE = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros"
  private http = inject(HttpClient);
  private AUTHOR_ID = "960806";
  private commonHeader = {
    'authorId': this.AUTHOR_ID
  }

  constructor() { }


  getAllProducts() {
    return this.http.get<Product[]>(`${this.URL_BASE}/bp/products`, {
      headers: {
        ...this.commonHeader
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError( () => new Error('Author Id requerido'));
        }
        return throwError( ()=> new Error('Algo salió mal: ' + error.error));
      })
    );
  }

  existsProductId(id: string) {
    return this.http.get<boolean>(`${this.URL_BASE}/bp/products/verification`, {
      params: {
        id
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError( () => new Error('Id del producto requerido requerido'));
        }
        return throwError( ()=> new Error('Algo salió mal: ' + error.error));
      })
    );
  }

  createProduct(product: Product) {
    return this.http.post<Product>(`${this.URL_BASE}/bp/products`, product, {
      observe: 'response',
      headers: {
        ...this.commonHeader
      },
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return throwError( () => new Error(error.error));
        }
        return throwError( ()=> new Error('Algo salió mal: ' + error.error));
      }),
      switchMap( (resp: HttpResponse<Product>) => {
        if (resp.status === 206) {
          let stringError = Object.keys(resp.body!).reduce((acc, key) => {
            return acc + `${key}, `;
          }, "Los campos: ");
          stringError += " son obligatorios."
          return throwError( () => new Error(stringError));
        }
        return from([resp.body!]);
      }),
    );
  }
}

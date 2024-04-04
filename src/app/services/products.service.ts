import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/Product';
import { catchError, from, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL_BASE = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros"
  private http = inject(HttpClient);
  private AUTHOR_ID = "19967";

  constructor() { }


  getAllProducts() {
    return this.http.get<Product[]>(`${this.URL_BASE}/bp/products`, {
      headers: {
        'authorId': this.AUTHOR_ID
      }
    }).pipe(
      catchError((error) => {
        if (error.status === 400) {
          return throwError( () => new Error('Author Id requerido'));
        }
        return throwError( ()=> new Error('Algo salió mal: ' + error.message));
      })
    );
  }

  existsProductId(id: string) {
    return this.http.get<boolean>(`${this.URL_BASE}/bp/products/verification`, {
      params: {
        id
      }
    }).pipe(
      catchError((error) => {
        if (error.status === 400) {
          return throwError( () => new Error('Id del producto requerido requerido'));
        }
        return throwError( ()=> new Error('Algo salió mal: ' + error.message));
      })
    );
  }
}

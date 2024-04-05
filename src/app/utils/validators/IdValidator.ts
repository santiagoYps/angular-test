import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Injectable({ providedIn: 'root' })
export class IdValidator implements AsyncValidator {
    constructor(private productService: ProductsService) {}

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const id = control.value;

        return this.productService.existsProductId(id).pipe(
            map(exists => (exists ? { idAlreadyUsed: true } : null )),
            catchError(() => of(null))
        );
    }
}
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addYears } from 'date-fns';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';
import { IdValidator } from '../../utils/validators/IdValidator'; 
import { currentOrFutureDateValidator } from '../../utils/validators/date.validator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  private productsService = inject(ProductsService);
  private idValidator = inject(IdValidator);

  productForm!: FormGroup;

  enableSubmit = false;
  
  constructor() {
    this.initForm();
    this.review.disable();
  }

  ngOnInit(): void {
    this.release.valueChanges.subscribe( value => {
      try {
        const releaseDate = this.strToDate(value)
        const reviewDate = addYears(releaseDate, 1);
        this.review.setValue(reviewDate.toISOString().split('T')[0]);
      }
      catch (error) {
        this.review.reset();
      }
      
    });
  }

  get id() {
    return this.productForm.get('id') as FormControl;
  }

  get name() {
    return this.productForm.get('name') as FormControl;
  }

  get desc() {
    return this.productForm.get('description') as FormControl;
  }

  get logo() {
    return this.productForm.get('logo') as FormControl;
  }

  get release() {
    return this.productForm.get('releaseDate') as FormControl;
  }

  get review() {
    return this.productForm.get('reviewDate') as FormControl;
  }

  createProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    }
    else {
      const product = {
        id: this.id.value as string,
        name: this.name.value as string,
        description: this.desc.value as string,
        logo: this.logo.value as string,
        date_release: this.strToDate(this.release.value),
        date_revision: this.strToDate(this.review.value),
      } as Product;

      this.productsService.createProduct(product).subscribe({
        next: (product) => {
          alert('Producto creado con éxito');
          this.resetForm();
        },
        error: (error: Error) => {
          //console.error('Error al crear el producto: ', error);
          alert('Error: ' + error.message);
        }
      });
    }
  }

  resetForm() {
    this.productForm.reset();
    this.review.enable();
    this.review.reset();
    this.review.disable();
  }


  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        asyncValidators: this.idValidator.validate.bind(this.idValidator),
        updateOn: 'blur',
      }),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required, currentOrFutureDateValidator() ]),
      reviewDate: new FormControl('', [Validators.required])
    });
  }

  strToDate(strDate: string){
    const [year, month, day] = strDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

}

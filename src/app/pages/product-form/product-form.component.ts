import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdValidator } from 'src/app/utils/validators/IdValidator';
import { currentOrFutureDateValidator } from 'src/app/utils/validators/date.validator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  private idValidator = inject(IdValidator);

  productForm!: FormGroup;
  
  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    // this.id.statusChanges.subscribe( status => {
    // });
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


  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        asyncValidators: this.idValidator.validate.bind(this.idValidator),
        updateOn: 'blur',
      }),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      logo: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required, currentOrFutureDateValidator]),
      reviewDate: new FormControl('', [Validators.required])
    });
  }

}

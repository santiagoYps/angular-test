import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Column } from '@shared/types/table.type';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  private productService = inject(ProductsService);

  loading = false;
  cols!: Column[];
  data: Product[] = [ ];

  searchProductInput = new FormControl('', {nonNullable: true});
  searchProductValue = '';

  constructor() { 
    this.initColumns();
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllProducts()
    .subscribe({
      next: (products) => {
        this.data = products.map( product => {
          return new Product(
            product.id,
            product.name,
            product.description,
            product.logo,
            new Date(product.date_release),
            new Date(product.date_revision)
          );
        });
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });

    this.searchProductInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((value) => value.trim()),
    ).subscribe((value) => {
      this.searchProductValue = value;
    });
  }

  initColumns() {
    this.cols = [
      {
        field: 'logo',
        header: 'Logo',
        help: false
      },
      {
        field: 'name',
        header: 'Nombre del producto',
        help: false
      },
      {
        field: 'description',
        header: 'Descripción',
        help: false
      },
      {
        field: 'shortReleaseDate',
        header: 'Fecha de liberación',
        help: false
      },
      {
        field: 'shortRevisionDate',
        header: 'Fecha de reestructuración',
        help: false
      }
    ]
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Column } from '@shared/types/table.type';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  loading = false;
  cols!: Column[];
  data: Product[] = [ ];

  searchProductInput = new FormControl('', {nonNullable: true});
  searchProductValue = '';

  constructor(private productService: ProductsService) { 
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
        console.log(error.message);
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
        type: 'img',
        help: false
      },
      {
        field: 'name',
        header: 'Nombre del producto',
        type: 'text',
        help: false
      },
      {
        field: 'description',
        header: 'Descripción',
        help: true,
        type: 'text',
        description: 'Descripción del producto'
      },
      {
        field: 'shortReleaseDate',
        header: 'Fecha de liberación',
        help: true,
        type: 'text',
        description: 'Fecha de liberación del producto'
      },
      {
        field: 'shortRevisionDate',
        header: 'Fecha de reestructuración',
        help: true,
        type: 'text',
        description: 'Fecha de reestructuración del producto'
      }
    ]
  }

}

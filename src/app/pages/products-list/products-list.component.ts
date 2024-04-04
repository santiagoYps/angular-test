import { Component, OnInit, inject } from '@angular/core';
import { Column } from '@shared/types/table.type';
import { Product } from 'src/app/interfaces/Product';
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

  constructor() { 
    this.initColumns();
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.data = products;
        //this.addDummyData();
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
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
        field: 'date_release',
        header: 'Fecha de liberación',
        help: false
      },
      {
        field: 'date_revision',
        header: 'Fecha de reestructuración',
        help: false
      }
    ]
  }

  addDummyData() {
    this.data.push({
      id: '1',
      logo: 'https://picsum.photos/100/100.jpg',
      name: 'Product 1',
      description: 'Description of Product 1',
      date_release: new Date(),
      date_revision: new Date()
    });
  }  
}

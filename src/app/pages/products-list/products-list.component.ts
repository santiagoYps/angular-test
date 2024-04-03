import { Component } from '@angular/core';
import { Column } from '@shared/types/table.type';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  cols: Column[] = [
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

  data: Product[] = [
    {
      id: '1',
      logo: 'https://picsum.photos/100/100.jpg',
      name: 'Product 1',
      description: 'Description of Product 1',
      date_release: '01/01/2000',
      date_revision: '01/01/2001'
    },
    {
      id: '1',
      logo: 'https://picsum.photos/100/100.jpg',
      name: 'Product 1',
      description: 'Description of Product 1',
      date_release: '01/01/2000',
      date_revision: '01/01/2001'
    }
  ];
  
}

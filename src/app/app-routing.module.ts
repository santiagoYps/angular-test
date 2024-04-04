import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsListComponent,
      },
      {
        path: 'new',
        component: ProductFormComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

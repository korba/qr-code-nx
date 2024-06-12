import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductResolver } from './product.resolver';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [  
  { 
    path: ':id', 
    component: ProductPageComponent,
    resolve: { resolvedData: ProductResolver } },
  { 
    path: '', 
    component: ProductListComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

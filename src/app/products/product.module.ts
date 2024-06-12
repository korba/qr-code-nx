import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    ProductPageComponent,
    ProductListComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    QRCodeModule
  ]
})
export class ProductsModule { }

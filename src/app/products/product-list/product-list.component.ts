import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ProductService } from '../product.service';
import { IProduct } from '../product.model';
import { Router } from '@angular/router';

@Component({
  styles: 'tr:hover td { background-color: lightblue;}',
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent  {
  pageTitle = 'Products List';  

  private productService = inject(ProductService);
  private router = inject(Router);

  products = this.productService.products;
  errorMessage = this.productService.productsError;

  productSelected(productId: number): void {
    this.productService.productSelected(productId);
    this.router.navigate(['/products', productId]);
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ProductService } from '../product.service';
import { IProduct } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage = '';

  sub!: Subscription;
  private productService = inject(ProductService);

  // Products
  products: IProduct[] = [];

  // Selected product id to highlight the entry
  selectedProductId = 0;

  ngOnInit(): void {
    this.sub = this.productService
      .getProducts()
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe({
        next: (products) => (this.products = products),
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }  
}

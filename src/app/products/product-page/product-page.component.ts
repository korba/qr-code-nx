import { Component, OnInit } from '@angular/core';
import { IProduct, IProductResolved } from '../product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  product: IProduct | null = null;
  errorMessage = "";
  qrCode = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: IProductResolved =
      this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.product = resolvedData.product;

    if (this.product)
      this.qrCode = "name: " +this.product?.name + " description: " + this.product?.description;        
  }
}

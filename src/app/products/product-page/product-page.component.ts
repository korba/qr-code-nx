import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  qrCode = "";
  showQR = false;

  private productService = inject(ProductService);

  product = this.productService.productById;
  errorMessage = this.productService.productByIdError;
  
  generateQRCode():void {
    this.qrCode = JSON.stringify(this.product());
    this.showQR = true;
  }

  hideQR(): void {
    this.showQR = false;
  }
}

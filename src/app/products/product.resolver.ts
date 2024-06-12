import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { IProductResolved } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProductResolved> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<IProductResolved> {

      const id = route.paramMap.get('id');
      if (!id) {
        const message = `Product id was null: ${id}`;
        console.error(message);
        return of({ product: null, error: message });        
      }

      if (isNaN(+id)) {
        const message = `Product id was not a number: ${id}`;
        console.error(message);
        return of({ product: null, error: message });
      }
  
      return this.productService.getProduct(+id)
        .pipe(
          map(product => ({ product: product })),
          catchError(error => {
            const message = `Retrieval error: ${error}`;
            console.error(message);
            return of({ product: null, error: message });
          })
        );

  }
}

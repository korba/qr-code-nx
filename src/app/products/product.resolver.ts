import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { IProduct, IProductResolved } from './product.model';
import { IResult } from '../utils/model/result';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IResult<IProduct>> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<IResult<IProduct>> {

    const id = route.paramMap.get('id');
    if (!id) {
      const message = `Product id was null: ${id}`;
      console.error(message);
      return of(
        ({
          data: undefined,
          errorMsg: message
        } as IResult<IProduct>)
      );
    }

    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of(
        ({
          data: undefined,
          errorMsg: message
        } as IResult<IProduct>)
      );
    }

    this.productService.productSelected(+id);
    
    // return this.productService.productByIdResult$;

    return of(
      ({
        data: this.productService.productById(),
        errorMsg: this.productService.productByIdError()
          // data: undefined,
          // errorMsg: ""
      } as IResult<IProduct>)      
    );

    // return this.productService.getProduct(+id)
    //   .pipe(
    //     map(product => ({ product: product })),
    //     catchError(error => {
    //       const message = `Retrieval error: ${error}`;
    //       console.error(message);
    //       return of({ product: null, error: message });
    //     })
    //   );

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { IProduct } from './product.model';
import { Observable, catchError, filter, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { IResult } from '../utils/model/result';
import { HttpErrorService } from '../utils/model/http-error.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'http://localhost:8000/products';

  constructor(
    private http: HttpClient,
    private errorService: HttpErrorService
  ) { }

  private productsResult$ = this.http.get<IProduct[]>(this.productsUrl)
    .pipe(
      map(p => ({ data: p, error: undefined }) as IResult<IProduct[]>),
      tap(p => console.log(JSON.stringify(p))),
      shareReplay(1),
      catchError(err => of({
        data: [],
        error: this.errorService.formatError(err)
      } as IResult<IProduct[]>))
    );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: ({
      data: [],
      errorMsg: undefined
    } as IResult<IProduct[]>)
  });

  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().errorMsg);

  
  // single product by ID

  private selectedProductId = signal<number | undefined>(undefined);  
  productSelected(selectedProductId: number): void {
    this.selectedProductId.set(selectedProductId);
  }
    
  productByIdResult$ = toObservable(this.selectedProductId)
  .pipe(
    filter(Boolean),
    switchMap(id => {
      const productUrl = this.productsUrl + '/' + id;
      return this.http.get<IProduct>(productUrl)
        .pipe(
          catchError(err => of({
            data: undefined,
            error: this.errorService.formatError(err)
          } as IResult<IProduct>))
        );      
    }),
    map(p => ({ data: p } as IResult<IProduct> ))
  );

  private productByIdResult = toSignal(this.productByIdResult$);

  productById = computed(() => this.productByIdResult()?.data);
  productByIdError = computed(() => this.productByIdResult()?.errorMsg);




  getProduct(id: number): Observable<IResult<IProduct>> {
    this.productSelected(id);
    return this.productByIdResult$

    // const productUrl = this.productsUrl + '/' + id;
    // return this.http.get<IProduct>(productUrl).pipe(
    //   tap(() => console.log('In http.get by id pipeline')),
    //   catchError((err) => {
    //     console.log(err);
    //     throw err;
    //   })
    // );

  }


}

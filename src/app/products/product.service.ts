import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'http://localhost:8000/products';

  constructor (
    private http: HttpClient    
  ) {}  

  getProducts(): Observable<IProduct[]> {    
    return this.http.get<IProduct[]>(this.productsUrl)
    .pipe(
      tap(() => console.log('In http.get pipeline')),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  getProduct(id: number): Observable<IProduct> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http.get<IProduct>(productUrl).pipe(
      tap(() => console.log('In http.get by id pipeline')),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }
}

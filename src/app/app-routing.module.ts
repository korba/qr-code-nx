import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: 'products', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./products/product.module').then(m => m.ProductsModule) 
  },
  { 
    path: 'start-page', component: AppComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: '', redirectTo: 'products', pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
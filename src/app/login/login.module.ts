import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]),
    FormsModule
  ],
})
export class LoginModule { }

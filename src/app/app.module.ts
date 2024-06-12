import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [  
  BrowserModule,
    CommonModule,
    LoginModule,
    HttpClientModule,    
    AppRoutingModule,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

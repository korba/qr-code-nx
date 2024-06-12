import { Component } from '@angular/core';
import { AuthenticationService } from './login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pageTitle = "QR Code Generator";

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }  

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor (
    private authService: AuthenticationService,
    private router: Router,) {}

  logOut(): void {
      this.authService.logout();
      this.router.navigateByUrl('/');
    }    
}

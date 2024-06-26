import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage = "";
  pageTitle = 'Log In';

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      // Navigate to the Product List page after log in.
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}

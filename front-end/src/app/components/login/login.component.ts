import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _authService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  /* login() {
    return this._authService.login('******@gamil.com', '*******').subscribe(data => console.log('SUCCESSFUL LOGIN'));
     
  } */

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this._authService.login(this.loginForm.value).pipe(
      map(token => this._router.navigate(['admin']))
    ).subscribe();
  }

}

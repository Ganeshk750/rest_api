import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomeValidators } from 'src/app/validators/password.validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private _authServie: AuthenticationService,
              private _formBuilder: FormBuilder,
              private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email:[null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password:[null, [Validators.required, Validators.minLength(3),
       CustomeValidators.passwordContainsNumber
      ]],
      passwordConfirm: [null, [Validators.required]]
    },{
        validators: CustomeValidators.passwordMatches
    })
  }


   onSubmit(){
     if(this.registerForm.invalid){
       return;
     }
     console.log(this.registerForm.value);
     this._authServie.register(this.registerForm.value).pipe(
       map(user => this._router.navigate(['/login']))
     ).subscribe();
   }




}

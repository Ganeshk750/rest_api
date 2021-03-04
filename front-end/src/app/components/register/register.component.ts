import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


class CustomeValidators {
  static passwordContainsNumber(controle: AbstractControl): ValidationErrors {
    const regax = /\d/;
    if(regax.test(controle.value) && controle.value !== null){
      return null;
    }else{
      return {passwordInvalid: true};
    }
  }
  static passwordMatches(control: AbstractControl): ValidationErrors {
    const password = control.get('password').value;
    const passwordConfirms = control.get('passwordConfirm').value;
    if((password === passwordConfirms) && (password !== null && passwordConfirms !== null)){
        return null;
    }else{
      return { passwordNotMatching: true};
    }
  }
}

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

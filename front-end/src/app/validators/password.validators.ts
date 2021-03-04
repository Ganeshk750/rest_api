import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomeValidators {
    static passwordContainsNumber(controle: AbstractControl): ValidationErrors {
        const regax = /\d/;
        if (regax.test(controle.value) && controle.value !== null) {
            return null;
        } else {
            return { passwordInvalid: true };
        }
    }
    static passwordMatches(control: AbstractControl): ValidationErrors {
        const password = control.get('password').value;
        const passwordConfirms = control.get('passwordConfirm').value;
        if ((password === passwordConfirms) && (password !== null && passwordConfirms !== null)) {
            return null;
        } else {
            return { passwordNotMatching: true };
        }
    }
}
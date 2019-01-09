import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordEquals: ValidatorFn = (signupForm: FormGroup): ValidationErrors | null => {
    const password = signupForm.get('password');
    const rpassword = signupForm.get('rpassword');

    return ((password.value !== rpassword.value) ? {'passwordEquals': true} : null);
  };
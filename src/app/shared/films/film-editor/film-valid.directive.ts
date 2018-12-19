import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';


export const scoreRequired: ValidatorFn = (filmForm: FormGroup): ValidationErrors | null => {
    const status = filmForm.get('status');
    const score = filmForm.get('score');

    return ((status.value !== 'To-Watch' && score.value === null) ? {'scoreRequired': true} : null);
  };
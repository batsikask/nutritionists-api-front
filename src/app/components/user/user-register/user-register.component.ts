import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatOptionModule, 
    MatSelectModule, 
    RouterLink,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  userService = inject(UserService);

  registrationStatus: {success: boolean; errors: boolean; message: string | string[]} = {
    success: false,
    errors: false,
    message: 'Not attempted yet',
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    is_nutritionist: new FormControl(false , [Validators.required])
  }, this.passwordConfirmValidator);

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password1').value !== form.get('password2').value) {
      form.get('password2').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  onSubmit() {
    const user = this.form.value as RegisterUser;
    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User registered', response);
        this.registrationStatus.success = true;
        this.registrationStatus.message = "User registered successfully";
      },
      error: (error) => {
        console.error('Register error', error);
        let errorMessage = [];
        if (error.error) {
          for (const field in error.error) {
            if (error.error.hasOwnProperty(field)) {
              errorMessage.push(`${error.error[field].join(' ')} `);
            }
          }
        }
        this.registrationStatus = {success: false, errors: true, message: errorMessage};
        console.log(errorMessage)
      },
    });
  }
}

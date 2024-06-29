import { Component, inject } from '@angular/core';
import { NormaluserService } from 'src/app/shared/services/normaluser.service';
import { NormalUser } from 'src/app/shared/interfaces/normal-user';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-normal-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './normal-user-profile.component.html',
  styleUrl: './normal-user-profile.component.css'
})
export class NormalUserProfileComponent {
  fb = inject(FormBuilder);
  normalUserService = inject(NormaluserService);
  normalUser = this.normalUserService.normalUserDetails;

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: [''],
    birth_date: [''],
    address: this.fb.array([
      this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        street_number: [''],
        zip_code: [''],
      }),
    ]),
    contact_info: this.fb.array([
      this.fb.group({
        phone_type: [''],
        phone_number: [''],
      }),
    ]),
  });

  get contact_info(): FormArray {
    return this.form.get('contact_info') as FormArray;
  }

  get address(): FormArray {
    return this.form.get('address') as FormArray;
  }

  ngOnInit() {
    if (this.normalUser()) {
      this.populateForm(this.normalUser());
    }
  }

    // Fills the form dynamically with the current data
    populateForm(user: NormalUser) {
      this.form.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        birth_date: user.birth_date,
      });
  
    if (user.address.length > 0) {
      this.address.clear();
      user.address.forEach(addr => {
        this.address.push(this.fb.group({
          country: [addr.country],
          city: [addr.city],
          street: [addr.street],
          street_number: [addr.street_number],
          zip_code: [addr.zip_code],
        }));
      });
    }

    if(user.contact_info.length > 0) {
      this.contact_info.clear();
      user.contact_info.forEach(contact => {
        this.contact_info.push(this.fb.group({
          phone_type: [contact.phone_type],
          phone_number: [contact.phone_number],
        }));
      });
    }
  }

  addPhoneNumber() {
    this.contact_info.push(
      this.fb.group({
        phone_number: [''],
        phone_type: [''],
      }),
    );
  }

  removePhoneNumber(index: number) {
    this.contact_info.removeAt(index);
  }

  addAddress() {
    this.address.push(
      this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        street_number: [''],
        zip_code: [''],
      }),
    );
  }

  removeAddress(index: number) {
    this.address.removeAt(index);
  }

  isObjectEmpty(obj: any): boolean {
    return Object.values(obj).every(value => value === '' || value === null);
  }

  // Removes empty and null values from the data that will be passed to the patch request
  cleanFormValues(value: any): Partial<NormalUser> {
    const cleanedValue: Partial<NormalUser> = {};

    for (const key in value) {
      if (value[key] instanceof Array) {
        const nonEmptyItems = value[key].filter((item: any) => !this.isObjectEmpty(item));
        if (nonEmptyItems.length > 0) {
          cleanedValue[key] = nonEmptyItems;
        }
      } else if (value[key] !== '' && value[key] !== null) {
        cleanedValue[key] = value[key];
      }
    }

    return cleanedValue;
  }

  submit(formValue: any) {
      const updatedNormalUser = this.cleanFormValues(formValue);
      this.normalUserService.updateNormalUserDetails(updatedNormalUser);
    }
}
import { Component, inject } from '@angular/core';
import { Client } from 'src/app/shared/interfaces/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { NutritionistService } from 'src/app/shared/services/nutritionist.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nutritionist-client-create',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
  ],
  templateUrl: './nutritionist-client-create.component.html',
  styleUrl: './nutritionist-client-create.component.css'
})
export class NutritionistClientCreateComponent {
  fb = inject(FormBuilder);
  clientService = inject(ClientService);
  nutritionistService = inject(NutritionistService);
  nutritionist = this.nutritionistService.nutritionistUserDetails;

  created = false;
  
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

  // Removes empty and null values from the data that will be passed to the request
  cleanFormValues(value: any): Partial<Client> {
    const cleanedValue: Partial<Client> = {};

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
    const client = this.cleanFormValues(formValue);
    console.log('form values', client);
    this.clientService.createClient(this.nutritionist().id, client).subscribe({
      next: (response) => {
        console.log('Client created', response);
        this.created = true;
        this.clientService.clients().push(formValue);
      },
      error: (error) => {
        console.error('Error creating client', error);
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { Client } from 'src/app/shared/interfaces/client';
import { ClientService } from 'src/app/shared/services/client.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nutritionist-client-edit',
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
  templateUrl: './nutritionist-client-edit.component.html',
  styleUrl: './nutritionist-client-edit.component.css'
})
export class NutritionistClientEditComponent {
  location: Location = inject(Location);
  fb = inject(FormBuilder);
  clientService = inject(ClientService);
  client = this.clientService.currentClient;

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
    if (this.client()) {
      this.populateForm(this.client());
    }
  }

    // Fills the form dynamically with the current data
    populateForm(client: Client) {
      this.form.patchValue({
        first_name: client.first_name,
        last_name: client.last_name,
        birth_date: client.birth_date,
      });
  
    if (client.address.length > 0) {
      this.address.clear();
      client.address.forEach(addr => {
        this.address.push(this.fb.group({
          country: [addr.country],
          city: [addr.city],
          street: [addr.street],
          street_number: [addr.street_number],
          zip_code: [addr.zip_code],
        }));
      });
    }

    if(client.contact_info.length > 0) {
      this.contact_info.clear();
      client.contact_info.forEach(contact => {
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
      const updatedClient = this.cleanFormValues(formValue);
      this.clientService.updateCurrentClientDetails(updatedClient);
    }

  goBack() {
    this.location.back();
  }
}

import { Component, inject } from '@angular/core';
import { Nutritionist } from 'src/app/shared/interfaces/nutritionist';
import { NutritionistService } from 'src/app/shared/services/nutritionist.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nutritionist-profile',
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
  templateUrl: './nutritionist-profile.component.html',
  styleUrl: './nutritionist-profile.component.css'
})
export class NutritionistProfileComponent {
  fb = inject(FormBuilder);
  nutritionistService = inject(NutritionistService);
  nutritionist = this.nutritionistService.nutritionistUserDetails;

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: [''],
    birth_date: [''],
    personal_address: this.fb.array([
      this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        street_number: [''],
        zip_code: [''],
      }),
    ]),
    office_address: this.fb.array([
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
    education: this.fb.array([
      this.fb.group({
        education_level: [''],
        education_title: [''],
      }),
    ]),
  });
  get personal_address(): FormArray {
    return this.form.get('personal_address') as FormArray;
  }

  get office_address(): FormArray {
    return this.form.get('office_address') as FormArray;
  }
  
  get contact_info(): FormArray {
    return this.form.get('contact_info') as FormArray;
  }

  get education(): FormArray {
    return this.form.get('education') as FormArray;
  }

  ngOnInit() {
    if (this.nutritionist()) {
      this.populateForm(this.nutritionist());
    }
  }

  // Fills the form dynamically with the current data
  populateForm(user: Nutritionist) {
    this.form.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      birth_date: user.birth_date,
    });

    if(user.personal_address.length > 0) {
    this.personal_address.clear();
    user.personal_address.forEach(addr => {
      this.personal_address.push(this.fb.group({
        country: [addr.country],
        city: [addr.city],
        street: [addr.street],
        street_number: [addr.street_number],
        zip_code: [addr.zip_code],
      }));
    });
  }

  if(user.office_address.length > 0) {
    this.office_address.clear();
    user.office_address.forEach(addr => {
      this.office_address.push(this.fb.group({
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

  if(user.education.length > 0) {
    this.education.clear();
    user.education.forEach(education => {
      this.education.push(this.fb.group({
        education_level: [education.education_level],
        education_title: [education.education_title],
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

  addPersonalAddress() {
    this.personal_address.push(
      this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        street_number: [''],
        zip_code: [''],
      }),
    );
  }

  removePersonalAddress(index: number) {
    this.personal_address.removeAt(index);
  }

  addOfficeAddress() {
    this.office_address.push(
      this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        street_number: [''],
        zip_code: [''],
      }),
    );
  }

  removeOfficeAddress(index: number) {
    this.office_address.removeAt(index);
  }

  addEducation() {
    this.education.push(
      this.fb.group({
        education_level: [''],
        education_title: [''],
      }),
    );
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }


  isObjectEmpty(obj: any): boolean {
    return Object.values(obj).every(value => value === '' || value === null);
  }

  // Removes empty and null values from the data that will be passed to the patch request
  cleanFormValues(value: any): Partial<Nutritionist> {
    const cleanedValue: Partial<Nutritionist> = {};

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
      const updatedNutritionist = this.cleanFormValues(formValue);
      this.nutritionistService.updateNutritionistUserDetails(updatedNutritionist);
    }
}

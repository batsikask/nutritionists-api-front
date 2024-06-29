import { Nutritionist } from './nutritionist';

export interface Address {
    id: number,
    country: string,
    city: string,
    street: string,
    street_number: string,
    zip_code: string,
}

export interface ContactInfo {
    id: number,
    phone_type: string,
    phone_number: string,
}

export interface NormalUser {
    id: number,
    first_name: string,
    last_name: string,
    birth_date: string,
    address: Address[],
    contact_info: ContactInfo[],
    nutritionists: Nutritionist[],
}

import { Address, ContactInfo, NormalUser } from './normal-user';

export interface Education {
    education_level: string;
    education_title: string;
}

export interface Nutritionist {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: string;
    personal_address: Address[];
    office_address: Address[];
    contact_info: ContactInfo[]; 
    education: Education[];
    clients: NormalUser[];
}

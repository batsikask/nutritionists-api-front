import { Address, ContactInfo } from './normal-user';
import { Nutritionist } from './nutritionist';
import { BiochemicalMeasurement, BodyMeasurement, Diet, Diseases, SegmentalBodyMeasurement } from './measurement';

export interface Client {
    id: number,
    first_name: string,
    last_name: string,
    birth_date: string,
    address: Address[],
    contact_info: ContactInfo[],
    nutritionists: Nutritionist[],
    body_measurements: BodyMeasurement[],
    segmental_body_measurements: SegmentalBodyMeasurement[],
    biochemical_measurements: BiochemicalMeasurement[],
    diseases: Diseases[],
    diet: Diet[]
}

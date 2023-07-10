export interface TypeIdEmployees {
    idemployees?: number;
};
export interface TypeEmployees extends TypeIdEmployees {
    employees_name: string;
    employees_lastname: string;
    employees_identification_type: string;
    employees_identification: string;
    employees_rh: string;
    employees_birthdate_date: string;
    employees_birthdate_city: string;
    employees_photo_path: string;
};
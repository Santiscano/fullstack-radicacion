
export enum UsersIdentificationType {
    'CEDULA CIUDADANIA',
    'NIT',
    'PASAPORTE',
    'CEDULA EXTRANJERIA',
    'RUT'
};

export interface UserDocumentRol {
    idroles: number;
    users_identification_type: UsersIdentificationType;
    users_identification: string; 
}


export interface Users extends UserDocumentRol {
    idusers?: number;
    idsedes: number;
    users_name: string;
    users_lastname?: string;
    users_address: string;
    users_password?: string;
    users_phone: string; 
    users_email: string; 
    users_providers_paydays?: (number | null);
    users_providers_expiration_date?: (Date | null);
    users_status?: string;
};


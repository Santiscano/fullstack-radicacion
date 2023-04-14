
enum UsersIdentificationType {
    'CEDULA CIUDADANIA',
    'NIT',
    'PASAPORTE',
    'CEDULA EXTRANJERIA',
    'RUT'
};

export interface Users {
    idroles: number, 
    idsedes: number, 
    users_identification_type: UsersIdentificationType, 
    users_identification: string, 
    users_name: string,
    users_lastname?: string,
    users_address: string,
    users_password?: string,
    users_phone: string, 
    users_email: string, 
    users_providers_paydays?: (number | null),
    users_providers_expiration_date?: (Date | null)
};
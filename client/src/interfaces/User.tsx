export interface AllUsers {
  idusers: number;
  idroles: number;
  idsedes: number;
  users_identification_type: string;
  users_identification: string;
  users_identification_digital_check: string;
  users_name: string;
  users_lastname: string;
  users_address: string;
  users_phone: string;
  users_email: string;
  users_password: string;
  users_providers_paydays: number | null;
  users_providers_expiration_date: string | null;
  users_status: string;
}

export interface setProviders {
  idusers: number;
  users_name: string;
}

export interface ValidatedUserInLogin {
  idroles?: number;
  idsedes?: number;
  idusers?: number;
  roles: string;
  sedes_city: string;
  sedes_name: string;
  users_email?: string;
  users_identification?: string;
  users_identification_type?: string;
  users_lastname?: string;
  users_name?: string;
  users_status?: string;
}

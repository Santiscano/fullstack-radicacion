export interface TypeIdEmergencyContact {
    idemergency_contact?: number;
};
export interface TypeEmergencyContact extends TypeIdEmergencyContact {
    idpersonal_information: string;
    emergency_contact_name: string;
    emergency_contact_lastname: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_cell_phone: string;
};
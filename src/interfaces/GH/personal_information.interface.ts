export interface TypeIdPersonalInformation {
    idpersonal_information?: number;
};
export interface TypePersonalInformation extends TypeIdPersonalInformation {
    idhiring: string;
    personal_information_residence_address: string;
    personal_information_residence_city: string;
    personal_information_phone: string;
    personal_information_cellphone: string;
    personal_information_email: string;
    personal_information_civil_status: string;
    personal_information_gender: string;
    personal_information_academic_level: string;
    personal_information_medical_emergency: string;
    personal_information_arl_emergency: string;
};
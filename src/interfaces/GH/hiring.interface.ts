export interface TypeIdHiring {
    idhiring?: number;
};
export interface TypeHiring extends TypeIdHiring {
    idemployees: string;
    idposition_company: string;
    idcompanys: string;
    hiring_entry_date: string;
    hiring_departure_date: string;
    hiring_salary: string;
    hiring_cost_center: string;
    hiring_eps: string;
    hiring_pension: string;
    hiring_family_compensation_fund: string;
    hiring_layoffs: string;
    hiring_arl: string;
    hiring_shirt_size: string;
    hiring_pant_size: string;
    hiring_shoe_size: string;
    hiring_status: string;
    hiring_revision: string;
};
enum FilesType {
    'ADMINISTRATIVO' = 1,
    'OPERATIVO' = 2
};

export interface File {
    files_registered: string 
    idsedes?: number 
    idproviders: number 
    idusers: number 
    files_type: FilesType  
    files_price: string 
    files_account_type: string 
    files_account_type_number: string 
    userSession: number
};

export interface FileEcontrol extends File {
    files_cost_center: string;
    files_code_accounting: string;
}

export interface PutFile extends File {
    idfiles: number,
    idfiles_states: number,
    files_cost_center: string, 
    files_code_accounting: string, 
    files_code_treasury: string,
    tracking_observation: string
}
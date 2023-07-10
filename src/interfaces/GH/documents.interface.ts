export interface TypeIdDocuments {
    iddocuments?: number;
};
export interface TypeDocuments extends TypeIdDocuments {
    iddocuments_type: string;
    idhiring: string;
    documents_creation_date: string;
    documents_path: string;
};
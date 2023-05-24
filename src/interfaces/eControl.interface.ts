

export interface eControl {
    users_identification_type: string;          // TIPO DE DOCUMENTO
    users_identification: number;               // NUMERO DEL DOCUMENTO DEL PROVEEDOR
    files_price: string;                        // PRECIO DEL DOCUMENTO
    files_account_type: string;                 // TIPO DE CUENTA DE COBRO
    files_account_type_number: string;          // NUMERO DE CUENTA DE COBRO
    pdfPurchaseOrder: string;                   // PDF BASE 64 - ORDEN DE COMPRA
    pdfElectronicBill: string;                  // PDF BASE 64 - FACTURA ELECTRONICA 
};


export interface eControl {
    idproviders: number;                // CEDULA DEL PROVEEDOR
    idusers: number;                    // USUARIO DE CONTABILIDAD
    idsedes: number;                    // CEDI MEDELLIN "1"
    files_type: string;                 // TIPO DE DOCUMENTO
    files_registered: string;           // NUMERO DE LA OC
    files_price: string;                // PRECIO DEL DOCUMENTO
    pdfPurchaseOrder: string;           // PDF BASE 64 - ORDEN DE COMPRA
    pdfElectronicBill: string;          // PDF BASE 64 - FACTURA ELECTRONICA 
};
export const selectCase = (value:string) => {
  switch (value) {
    case "files_price":
      return "PRECIO";
    case "files_account_type":
      return "TIPO DE CUENTA";
    case "files_account_type_number":
      return "NUMERO DE CUENTA";
    case "idusers":
      return "RESPONSABLE ASIGNADO";
    case "files_type":
      return "TIPO DE FACTURA";
    case "files_registered":
      return "RADICADO"
    case "idsedes":
      return "CEDE";
    case "idproviders":
      return "PROVEEDOR";
    case "userSession":
      return "USUARIO EN SESION";
    default:
      return "NO SABEMOS QUE FALLO";
  }
};

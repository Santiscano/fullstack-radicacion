import { Roles } from '../../interfaces/Roles';
import 'dotenv/config'

export const roles:Roles = Object.freeze({
  Proveedor   : 1,
  Radicacion  : 2,
  AuditorGH   : 3,
  AuditorCRTL : 4,
  AuditorRG   : 5,
  Gerencia    : 6,
  Contabilidad: 7,
  Tesoreria   : 8,
  AuditorTI   : 9,
  Administrador: 10,
});

export const stateFile = Object.freeze({
  Asignado : 1,
  Cargado: 2,
  AprobadoAuditor: 3,
  AprobadoGerente: 4,
  AprobadoContabilidad: 5,
  Finalizado: 6,
  Rechazado: 7,
  Devuelto: 8,
  Pendiente: 9,
  Temporal: 10,
  Anulado: 11,
});

export function set(key:string, item:string): void {
  sessionStorage.setItem(key, item);
}

export function get(key:string): string | null | undefined {
  return sessionStorage.getItem(key) ?? '';
}

export function remove(item:string): void {
  sessionStorage.removeItem(item);
}

export function removeAll(): void {
  sessionStorage.clear();
}

export function finishedSession (){
  remove("accessToken");
  navigate("/login");
} 

export function getJWT(key = null):any {
//   const jwt = jwt_decode(get("jwt"));
//   return key === null ? jwt : getJWT.data[key];
}

export function viewDisplayRol(role: number): string {
  // @ts-ignore
  return roleDisplay[role] || "role desconocido"
}

/**
 * headers para objetos
 * @returns
 */
export function getHeader() {
  return {
    headers: {
      "Content-Type": "application/json",
      "api_key": "37323a416eb548626b3e668255c4d436",
      authorization: `Bearer ` + get("accessToken"),
    },
  };
}

/**
 * headers para pdf y fotos
 * @returns
 */
export function getHeaderMultipart() {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ` + get("accessToken"),
      "api_key": import.meta.env.VITE_API_KEY,
    },
  };
}

/**
 * @param param0 lista de roles que podran ver el resultado
 * @param param1 rol que esta en sesion y quiere observar
 * ?listRoles toma el array de roles su valor, tener en cuenta que tambien se puede utilizar Object.keys pero en este caso seria un string
 * ?doTheseRolExist es el nuevo array que filtro los roles no existentes de listRoles en allowedRolesList y despues de limpiar con find solo toma el primer valor que coincide
 * lo anterior fue para limpiar los roles prosiblemente falsos
 * @returns toma el nuevo array y devuelve true o false si el rol tiene o no permisos de ver
 * conclusion la lista de roles permitidos el rol actual y dice si tiene permisos
 */
// export const validateHasRoleAllowedPromise = async (allowedRolesList:any[]): Promise<boolean> => {
//   const response = await validateUserFirebase();
//   // @ts-ignore
//   const idrole = await response?.data.idroles;
//   console.log('idrole promise: ', idrole);
//   if(!idrole || !allowedRolesList){
//     return false;
//   } else {
//     const listRoles = Object.values(roles);
//     const doTheseRolExist = allowedRolesList.filter((role) =>
//     listRoles.find((item) => item === role)
//     );
//     console.log('includes: ', doTheseRolExist.includes(parseInt(idrole)));
//     return doTheseRolExist.includes(parseInt(idrole));
//   }
// };
export const validateHasRoleAllowed = (allowedRolesList:any[]):boolean => {
  const idrole = get("idroles");
  // console.log('idrole notPromise: ', idrole);
  if(!idrole || !allowedRolesList){
    return false;
  } else {
    const listRoles = Object.values(roles);
    const doTheseRolExist = allowedRolesList.filter((role) =>
    listRoles.find((item) => item === role)
    );
    return doTheseRolExist.includes(parseInt(idrole));
  }
};

export function session() {
  return Boolean(get("accessToken"));
}

/**
 *
 * @returns comprueba si el valor de sesion storage es undefinend o null y de ser asi retorna false
 * @accessToken en el sesionStorage es undefined o null. si es asi devuelve true
 */
// export function session() {
//   // @ts-ignore
//   return [undefined, null].includes(get("accessToken")) ? false : true;
// }




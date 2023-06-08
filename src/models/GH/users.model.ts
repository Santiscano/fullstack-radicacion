import 'dotenv/config'
import { connection } from '../../config/database/db';
import type Data from '../../interfaces/DataSql2.interface';

// OBSERVACION IMPORTANTE, AQUI AUN ESTAN PENDIENTES LOS INNER JOIN CON LAS CORRESPONDIENTES TABLAS NUEVAS CREADAS

// TRAER EMPLEADOS
export const getEmployeesModel = async():Promise<Data> => {
    const [ employees ] = await connection.query(`
        SELECT * FROM users
            WHERE idroles = ?
    `,[11]);
    console.log(employees);
    return employees;
};
// TRAER POR ID
export const getEmployeeByIdModel = async(data:number):Promise<{message:string, data?:Data}> => {
    const [ validate ] = await connection.query(`SELECT count(*) AS counter FROM users WHERE idusers = ? AND idroles = ?;`,[data, 11]);
    // @ts-ignore
    if(validate == 0) return {message: `El empleado no existe`}
    const [ employee ] = await connection.query(`
        SELECT * FROM users
            WHERE idusers = ? AND idroles = ?;
    `,[data, 11]);
    return { message: `usuario con id ${data} encontrado`, data:employee }
};
// CREAR EMPLEADO
export const postEmployeeModel = () => {};
// EDITAR EMPLEADO
export const putEmployeeModel = () => {};
// ELIMINAR EMPLEADO
export const deleteEmployeeModel = () => {};
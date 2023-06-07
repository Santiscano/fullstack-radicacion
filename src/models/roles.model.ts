import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Roles } from '../interfaces/roles.interface';
import { countTable, getOneRowTable } from '../utilities/SQL/countTable.utilities';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 

// TRAER ROLES
export const getRolesModel = async(): Promise<{ data: Data }> => {
    const [ roles ] = await connection.query('SELECT * FROM roles;')
    return { data: roles }
};

//TRAER NOMBRE ROLES
export const getRolesNameModel = async(): Promise<{data: Data}> => {
    const [ roles ] = await connection.query('SELECT roles FROM roles;')
    return { data: roles }
};

// TRAER IDROLES SEGÚN NOMBRE DEL ROL
export const getIdRolesModel = async (roles:string): Promise<{message?:string, data?:Data}> => {
    if(await countTable("roles", "roles", roles) === 0 ) return { message: "Rol No Existente"};
    const [ idroles ]: any = await connection.query('SELECT idroles FROM roles WHERE roles = ?;',[roles])
    return { data: idroles[0].idroles };
};

// TRAER  !== ADMINISTRADOR & PROOVEDOR
export const getAdminNotProviderModel = async(): Promise<{data: Data}> => {
    const [ adminProvider ] = await connection.query('SELECT * FROM roles WHERE idroles <> ? AND idroles <> ?;',[1, 10])
    return { data: adminProvider }
};

// TRAER PROVEEDOR
export const getRolProviderModel = async (): Promise<{data: Data}> => {
    const [ provider ] = await connection.query('SELECT * FROM roles WHERE idroles = ?;',[1])
    return { data: provider }
};

// CREAR ROLES
export const postRolesModel = async (data: Roles): Promise<{message:string, data?: Data}> =>{
    const [ rol ] = await connection.query(`
            SELECT count(*) AS contador FROM roles WHERE roles = ?;
        `, data.roles);
    // @ts-ignore
    if ( rol[0].contador !== 0 ) {
        return { message: `El rol: ${ data.roles }, ya se encuentra registrado.` };
    };
    await connection.query(`
        INSERT INTO roles (roles, roles_description)
        VALUES ( ?, ? );`, 
        [
            data.roles.toUpperCase(), 
            data.roles_description.toUpperCase()
        ]);
    const [ rolCreated ] = await connection.query(`SELECT * FROM roles WHERE roles = ?`, [ data.roles.toUpperCase() ]);
    return { message: `Rol creado satisfactoriamente`, data: rolCreated };
};

// EDITAR ROLES
export const putRolModel = async( data: Roles ): Promise<{ message:string, data?: Data }> => {
    const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM roles WHERE idroles = ?;`, data.idroles );
    // @ts-ignore
    if( validate[0].contador === 0 ) {
        return { message: `El rol con id:${ data.idroles }, no se encuentra registrado en el sistema.` };
    };
    await connection.query(`
        UPDATE roles SET roles = ?, roles_description = ? WHERE idroles = ?;`, 
        [ 
            data.roles_description.toUpperCase(), 
            data.roles.toUpperCase(), 
            data.idroles 
        ]);
    const [ dataRol ] = await connection.query(`SELECT * FROM roles WHERE idroles = ?;`,[ data.idroles ]);
    return { message: `El rol: ${ data.idroles }, fue editado satisfactoriamente`, data: dataRol };
};

// DELETE ROL
export const deleteRolModel = async(data: number): Promise<{message:string}> => {
    const [ rolValidate ] = await connection.query(`SELECT count(*) AS contador FROM roles WHERE idroles = ?;`, [ data ]);
    // @ts-ignore
    if ( rolValidate[0].contador === 0){
        return { message: `El rol: ${ data }, no se encuetra regristrado en la base de datos` };
    };
    await connection.query(`DELETE FROM roles WHERE idroles = ?;`, [ data ]);
    return { message: `El rol: ${ data }, fue eliminado con éxito.` };
};
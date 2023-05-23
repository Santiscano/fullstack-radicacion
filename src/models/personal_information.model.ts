import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { PersonalInformation } from '../interfaces/personal_information.interface';
import { countTable, getTableRow } from '../utilities/countTable.utilities';


type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 

// TRAER INFORMACIÓN PERSONAL
export const getPersonalInformationModel = async(): Promise<{ data: Data }> => {
    const [ data ] = await connection.query('SELECT * FROM personal_information;')
    return { data }
};

// CREAR INFORMACIÓN PERSONAL DE UN USUARIO
export const postPersonalInformationModel = async(data: PersonalInformation): Promise<{ message?:string, data?: Data }> => {
    if(await countTable("users", "idusers", data.idusers) === 0) return { message: `USUARIO con id: ${data.idusers}, no se encuentra registrado` };
    if(await countTable("personal_information", "idusers", data.idusers) === 1) return { message: `INFORMACIÓN PERSONAL del USUARIO con id: ${data.idusers}, ya se encuentra registrada` };
    await connection.query(`
        INSERT INTO personal_information (idusers, personal_information_family_compensation_fund, personal_information_pension, personal_information_layoffs, personal_information_eps, personal_information_arl, personal_information_medical_emergency, personal_information_arl_emergency, personal_information_rh, personal_information_academic_level, personal_information_birthdate, personal_information_gender, personal_information_civil_status, personal_information_city, personal_information_shirt_size, personal_information_pant_size, personal_information_shoe_size)
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
        `, [
            data.idusers,
            data.personal_information_family_compensation_fund.toUpperCase(),
            data.personal_information_pension.toUpperCase(),
            data.personal_information_layoffs.toUpperCase(),
            data.personal_information_eps.toUpperCase(),
            data.personal_information_arl.toUpperCase(),
            data.personal_information_medical_emergency.toUpperCase(),
            data.personal_information_arl_emergency.toUpperCase(),
            data.personal_information_rh.toUpperCase(),
            data.personal_information_academic_level.toUpperCase(),
            data.personal_information_birthdate.toUpperCase(),
            data.personal_information_gender.toUpperCase(),
            data.personal_information_civil_status.toUpperCase(),
            data.personal_information_city.toUpperCase(),
            data.personal_information_shirt_size.toUpperCase(),
            data.personal_information_pant_size.toUpperCase(),
            data.personal_information_shoe_size.toUpperCase()
        ]);
    const [ PI ] = await connection.query(`SELECT * FROM personal_information WHERE idusers = ?`, [data.idusers]);
    return { data: PI };
};

// EDITAR LA INFORMACIÓN PERSONAL DE UN USUARIO
export const putPersonalInformationModel = async(data: PersonalInformation): Promise<{message?:string, data?: Data}> => {
    if(await countTable("personal_information", "idusers", data.idusers) === 0) return {message: `INFORMACIÓN PERSONAL del USUARIO con id: ${data.idusers}, no existe en el sistema`};
    await connection.query(`
        UPDATE personal_information SET
        personal_information_family_compensation_fund = ?,
        personal_information_pension = ?,
        personal_information_layoffs = ?,
        personal_information_eps = ?,
        personal_information_arl = ?,
        personal_information_medical_emergency = ?,
        personal_information_arl_emergency = ?,
        personal_information_rh = ?,
        personal_information_academic_level = ?,
        personal_information_birthdate = ?,
        personal_information_gender = ?,
        personal_information_civil_status = ?,
        personal_information_city = ?,
        personal_information_shirt_size = ?,
        personal_information_pant_size = ?,
        personal_information_shoe_size = ?
            WHERE idusers = ?;
    `, [
        data.personal_information_family_compensation_fund.toUpperCase(),
        data.personal_information_pension.toUpperCase(),
        data.personal_information_layoffs.toUpperCase(),
        data.personal_information_eps.toUpperCase(),
        data.personal_information_arl.toUpperCase(),
        data.personal_information_medical_emergency.toUpperCase(),
        data.personal_information_arl_emergency.toUpperCase(),
        data.personal_information_rh.toUpperCase(),
        data.personal_information_academic_level.toUpperCase(),
        data.personal_information_birthdate.toUpperCase(),
        data.personal_information_gender.toUpperCase(),
        data.personal_information_civil_status.toUpperCase(),
        data.personal_information_city.toUpperCase(),
        data.personal_information_shirt_size.toUpperCase(),
        data.personal_information_pant_size.toUpperCase(),
        data.personal_information_shoe_size.toUpperCase(),
        data.idusers
    ]);
    return { data: await getTableRow("personal_information", "idusers", data.idusers) }
};


// ELIMINAR INFORMACIÓN PERSONAL DE UN USUARIO
export const deletePersonalInformationModel = async (data: number): Promise<{message: string}> => {
    if (await countTable("personal_information", "idusers", data) === 0) return {message: `INFORMACIÓN PERSONAL del USUARIO con id: ${data}, no se encuentra registrada en el sistema`};
    await connection.query(`DELETE FROM personal_information WHERE idusers = ?;
    `, [ data ]);
    return { message: `INFORMACIÓN PERSONAL del USUARIO con id: ${data}, fue eliminado con éxito.` }
};
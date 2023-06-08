import { Request, Response } from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { success, unsuccessfully, unauthorized, uncompleted, errorMessage } from "../../utilities/responses.utilities";
import { simplisticsConnection } from '../../config/database/simplistics_DB';
import { getIdSedesModel } from '../../models/sedes.model';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';
import { getAllRowTable } from '../../utilities/SQL/countTable.utilities';

export const simplisticsPortafolio = async (req: Request, res: Response) => {
    const { tipoDoc } = req.params;
    try {
        const [ query ] = await simplisticsConnection.query(`
            SELECT P.CODIGO_PK,
                    P.SP_SKU,
                    P.SP_EAN_BARCODE,
                    P.SP_DESCRIPCION,
                    P.SP_TALLA_LINEA,
                    P.SP_COLOR,
                    P.SP_FILE,
                    P.FECHA,
                    P.ESTADO,
                    U.TIPODOC
                FROM TB_PORAFOLIO P
                LEFT JOIN TB_USUARIO U ON U.TB_USUARIO_LOGIN = P.SP_CLIENTE
                    WHERE U.TIPODOC = ?;`, tipoDoc);
        return res.status(200).json(success(query));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
}
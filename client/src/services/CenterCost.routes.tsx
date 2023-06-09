import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";
import { numberToStringWithTwoDigitNumber as numberToString } from "../Utilities/formatted.utility";

/**
 * AREA
 */
export const getArea = async () => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.area.getCostArea,
      {
        api_key: import.meta.env.VITE_API_KEY,
      },
      getHeader()
    );
    // console.log("response: ", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const createArea = async (
  cost_center_area: string,
  cost_center_area_name: string
) => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.area.createCostArea,
      {
        cost_center_area,
        cost_center_area_name,
      },
      getHeader()
    );
    // console.log("response: ", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const deleteArea = async () => {
  try {
    const response = await axios.delete(
      Routes.api.centerCost.area.deleteCostArea,
      getHeader()
    );
    // console.log("response: ", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
/**
 * SUBAREA
 */
export const getAllSubAreas = async () => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.subArea.getCostSubArea,
      { api_key: import.meta.env.VITE_API_KEY },
      getHeader()
    );
    // console.log("response:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const getSubAreaById = async (idcost_center_area: any) => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.subArea.getCostSubAreaById,
      {
        api_key: import.meta.env.VITE_API_KEY,
        idcost_center_area,
      },
      getHeader()
    );
    // console.log("response:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const createSubArea = async (
  idcost_center_area: any,
  cost_center_subarea: any,
  cost_center_subarea_name: any
) => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.subArea.createCostSubArea,
      {
        idcost_center_area,
        cost_center_subarea,
        cost_center_subarea_name,
      },
      getHeader()
    );
    // console.log("response:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const deleteSubArea = async () => {
  try {
    const response = await axios.delete(
      Routes.api.centerCost.subArea.deleteCostSubArea,
      getHeader()
    );
    // console.log("response:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
/**
 * CENTRO DE COSTOS
 */
export const getCostCenter = async () => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.CenterCost.getCostCenter,
      // @ts-ignore
      { api_key: import.meta.env.VITE_API_KEY },
      // @ts-ignore
      getHeader()
    );
    // console.log("getCostCenter:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const getCostCenterById = async (id: any) => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.CenterCost.getCostCenterById,
      // @ts-ignore
      {
        api_key: import.meta.env.VITE_API_KEY,
        idcost_center_subarea: id,
      },
      // @ts-ignore
      getHeader()
    );
    // console.log("getCostCenter:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const createCostCenter = async (
  idcost_center_subarea: any,
  cost_center: any,
  cost_center_name: any
) => {
  try {
    const response = await axios.post(
      Routes.api.centerCost.CenterCost.createCostCenter,
      {
        idcost_center_subarea,
        cost_center,
        cost_center_name,
      },
      getHeader()
    );
    console.log("response:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const deleteCostCenter = async () => {
  try {
    const response = await axios.get(
      Routes.api.centerCost.CenterCost.deleteCostCenter,
      getHeader()
    );
    // console.log("response:", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const centerCostTable = async () => {
  try {
    const getTable = await axios.get(
      Routes.api.centerCost.table.getCostTable,
      getHeader()
    );
    console.log("get Table Center cost", getTable);
    return getTable.data;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};

import { useContext } from 'react';
import useContextProvider, { GeneralValuesContext } from "../../Context/GeneralValuesContext";
import { numberToStringWithTwoDigitNumber as numberToString } from "../../Utilities/formatted.utility";
import { createArea } from "../../services/CenterCost.routes";
import { createRol } from "../../services/Roles.routes";


const { setPreLoad } = useContextProvider();

export const handleSubmitCreateRol = async (
  e:any,
  rolName:string,
  setRolName: any,
  rolDescription:string,
  setRolDescription:any,
  ) => {
    try{
    setPreLoad(true);
    e.preventDefault();
    const res = await createRol(rolName, rolDescription);
    setRolName('');
    setRolDescription('');
  } catch(error) {
    // console.log('error: ', error);
  } finally {
    setPreLoad(false);
  }
};

export const handleSubmitCreateArea = async (e:any, areaNumber:number, setAreaNumber:any, areaName:string, setAreaName:any) => {
  try{
    setPreLoad(true);
    e.preventDefault();
    const response = await createArea(numberToString(areaNumber), areaName);
    // console.log('response: ', response);
    if(response?.status == 200){
      setAreaNumber('');
      setAreaName('');
    }
    return response;
  } catch(error) {
    // console.log('error: ', error);
  } finally{
    setPreLoad(false);
  }
}

export const handleSubmitCreateSubArea = async () => {
  try{
    setPreLoad(true);
  } catch(error) {
    // console.log('error: ', error);
  } finally{
    setPreLoad(false);
  }
}

export const handleSubmitCreateCostCenter = async () => {
  try{
    setPreLoad(true);
  } catch(error) {
    // console.log('error: ', error);
  } finally{
    setPreLoad(false);
  }
}

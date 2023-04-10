import { IsLoadingType } from "./Loading";
import { ValidatedUserInLogin } from './User'

export interface GeneralValuesType extends IsLoadingType {
  errorLogin: string;
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>;
  user?: ValidatedUserInLogin;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  openModalAuth: boolean;
  setOpenModalAuth: React.Dispatch<React.SetStateAction<any>>;
  handleOpenModalAuth: any;
  handleCloseModalAuth: any;
  dataUser: any;
  setDataUser: React.Dispatch<React.SetStateAction<any>>;
  rows: any,
  setRows: React.Dispatch<React.SetStateAction<any>>;
  handleUpdateRows: any;
}

import { SelectChangeEvent } from "@mui/material";
import { useState, useEffect } from "react";
import {
  get,
  roles,
  stateFile,
} from "../../../components/tools/SesionSettings";
import { getStatesFiles } from "../../../services/StateFiles.routes";
import { getUsers } from "../../../services/Users.routes";

export const useModalForm = () => {
  // ------------------------------VARIABLES------------------------------//
  const [comments, setComments] = useState("");
  const [openPDF, setOpenPdf] = useState(false);
  const [redirectTo, setRedirectTo] = useState<number>();
  const [allUsers, setAllUsers] = useState([""]); // recibi todos los usuarios de DB
  const [optionsRedirectTo, setOptionsRedirectTo] = useState([""]); // filtro allUsers con opciones redirectTo
  const [optionsReturnTo, setOptionsReturnTo] = useState([""]); // filtro allUsers con opciones redirectTo
  const [activitySelect, setActivitySelect] = useState<any>(); //valor opcion seleccionada de actividad a realizar
  const [optionsActivity, setOptionsActivity] = useState<any>();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95vw",
    height: "80vh",
    overflow: "scroll",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };
  // -----------------------METHODS INPUTS--------------------------------//
  const handleComments = (e: any) => setComments(e.target.value);

  const handleRedirectTo = (e: SelectChangeEvent) => {
    setRedirectTo(Number(e.target.value));
  };

  const handleActivitySelect = (e: SelectChangeEvent) =>
    setActivitySelect(e.target.value);

  const handleGetUsers = async () => {
    // users
    const getAllUsers = await getUsers();
    setAllUsers(getAllUsers);

    // get states files & nextAuditor
    const getAllStates = await getStatesFiles();
    const states = await getAllStates?.data.data;

    isReturn(getAllUsers);

    if (getAllUsers && states) {
      if (Number(get("idroles")) == roles.AuditorGH) {
        return isGH(states, getAllUsers);
      } else if (Number(get("idroles")) == roles.AuditorCRTL) {
        return isCRTL(states, getAllUsers);
      } else if (Number(get("idroles")) == roles.AuditorRG) {
        return isRG(states, getAllUsers);
      } else if (Number(get("idroles")) == roles.Gerencia) {
        return isGerencia(states, getAllUsers);
      } else if (Number(get("idroles")) == roles.Contaduria) {
        return isContaduria(states, getAllUsers);
      } else if (Number(get("idroles")) == roles.Tesoreria) {
        return isTesoreria(states, getAllUsers);
      } else if (Number(get("idroles")) == roles.AuditorTI) {
        return isTecnologia(states, getAllUsers);
      }
    }
  };

  const isGH = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.AprobadoAuditor ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Gerencia
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isCRTL = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.AprobadoAuditor ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Gerencia
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isRG = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.AprobadoAuditor ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Gerencia
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isGerencia = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.AprobadoGerente ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Contaduria
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isContaduria = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.AprobadoContabilidad ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Tesoreria
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isTesoreria = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.Finalizado ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Administrador
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isTecnologia = (stateList: any, auditors: any) => {
    const view = stateList.filter(
      (state: { idfiles_states: number }) =>
        state.idfiles_states == stateFile.AprobadoAuditor ||
        state.idfiles_states == stateFile.Rechazado ||
        state.idfiles_states == stateFile.Devuelto ||
        state.idfiles_states == stateFile.Pendiente ||
        state.idfiles_states == stateFile.Temporal ||
        state.idfiles_states == stateFile.Anulado
    );
    setOptionsActivity(view);

    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        user.idroles == roles.Gerencia
    );
    setOptionsRedirectTo(nextAuditor);
  };

  const isReturn = (auditors: any) => {
    console.log("ejecute isReturn: ");
    const nextAuditor = auditors?.filter(
      (user: { idroles: number; idusers: number }) =>
        (user.idroles == roles.AuditorCRTL ||
          user.idroles == roles.AuditorGH ||
          user.idroles == roles.AuditorRG ||
          user.idroles == roles.AuditorTI ||
          user.idroles == roles.Gerencia) &&
        user.idusers !== Number(get("idusers"))
    );
    console.log("nextauditor", nextAuditor);
    setOptionsReturnTo(nextAuditor);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return {
    activitySelect,
    setActivitySelect,
    handleActivitySelect,
    optionsActivity,
    redirectTo,
    setRedirectTo,
    handleRedirectTo,
    optionsRedirectTo,
    optionsReturnTo,
    style,
  };
};

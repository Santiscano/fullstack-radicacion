import { setModalUserView, setRemoveUserView } from "../Redux-reducer/modalUserViewSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useModalUserView = () => {
  const dispatch = useAppDispatch();

  const addModalUser = (user:any) => {
    dispatch(setModalUserView(user));
  };

  const removeModalUser = () => {
    dispatch(setRemoveUserView());
  };

  const setUsersIdentification = (users_identification: string) => {
    dispatch(setModalUserView({users_identification}))
  };

  const setUsersName = (users_name:string) => {
    dispatch(setModalUserView({users_name}))
  };
  const setUsersLastName = (users_lastname:string) => {
    dispatch(setModalUserView({users_lastname}))
  };
  const setUsersAddress = (users_address:string) => {
    dispatch(setModalUserView({users_address}))
  };
  const setUsersPhone = (users_phone:string) => {
    dispatch(setModalUserView({users_phone}))
  };
  const setUsersEmail = (users_email:string) => {
    dispatch(setModalUserView({users_email}))
  };
  const setUsersLimitDayPayment = (users_providers_paydays:number) => {
    dispatch(setModalUserView({users_providers_paydays}))
  };
  const setUsersExpiration = (users_providers_expiration_date:string) => {
    dispatch(setModalUserView({users_providers_expiration_date}))
  };
  const setEditSedes = (idsedes:number,sedes_address:string, sedes_city:string, sedes_country:string, sedes_name:string, sedes_state:string, sedes_type:string ) => {
    dispatch(setModalUserView({
      idsedes,
      sedes_address,
      sedes_city,
      sedes_country,
      sedes_name,
      sedes_state,
      sedes_type,
    }))
  };
  const setidentificationType = (users_identification_type: any) => {
    dispatch(setModalUserView({users_identification_type}))
  };
  const setSedesName = (sedes_name: any) => {
    dispatch(setModalUserView({sedes_name}))
  };
  const setRolesName = (roles: string) => {
    dispatch(setModalUserView({roles}))
  };

  return {
    addModalUser,
    removeModalUser,
    setUsersIdentification,
    setUsersName,
    setUsersLastName,
    setUsersAddress,
    setUsersPhone,
    setUsersEmail,
    setUsersLimitDayPayment,
    setUsersExpiration,
    setEditSedes,
    setidentificationType,
    setSedesName,
    setRolesName,
  };
};


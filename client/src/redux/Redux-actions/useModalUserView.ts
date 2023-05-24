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

  const setUsersIdentification = (newIdentification: any) => {
    dispatch(setModalUserView({users_identification:newIdentification}))
  };

  const setUsersName = (newDate:any) => {
    dispatch(setModalUserView({users_name:newDate}))
  };
  const setUsersLastName = (newDate:any) => {
    dispatch(setModalUserView({users_lastname:newDate}))
  };
  const setUsersAddress = (newDate:any) => {
    dispatch(setModalUserView({users_address:newDate}))
  };
  const setUsersPhone = (newDate:any) => {
    dispatch(setModalUserView({users_phone:newDate}))
  };
  const setUsersEmail = (newDate:any) => {
    dispatch(setModalUserView({users_email:newDate}))
  };
  const setUsersLimitDayPayment = (newDate:any) => {
    dispatch(setModalUserView({users_providers_paydays:newDate}))
  };
  const setUsersExpiration = (newDate:any) => {
    dispatch(setModalUserView({users_providers_expiration_date:newDate}))
  };
  const setEditSedes = (idsedes:any,sedes_address:any, sedes_city:any, sedes_country:any, sedes_name:any, sedes_state:any, sedes_type:any ) => {
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
  const setidentificationType = (newDate: any) => {
    dispatch(setModalUserView({users_identification_type: newDate}))
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
  };
};


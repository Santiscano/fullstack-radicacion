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
  };
};


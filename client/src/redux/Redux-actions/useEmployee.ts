import { setEmployee, setRemoveEmployee, type Employee } from "../Redux-reducer/employeesSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const addEmployee = (employee: Employee) => {
    dispatch(setEmployee(employee))
  };
  const removeEmployee = () => {
    dispatch(setRemoveEmployee());
  };

  const setSedesName = (sedes_name: string) => {
    dispatch(setEmployee({sedes_name}))
  };

  const setidentificationType = (users_identification_type: any) => {
    dispatch(setEmployee({users_identification_type}))
  };

  const setUsersIdentification = (users_identification: string) => {
    dispatch(setEmployee({users_identification}))
  };
  const setUsersName = (users_name:string) => {
    dispatch(setEmployee({users_name}))
  };
  const setUsersLastName = (users_lastname:string) => {
    dispatch(setEmployee({users_lastname}))
  };
  const setUsersAddress = (users_address:string) => {
    dispatch(setEmployee({users_address}))
  };
  const setUsersPhone = (users_phone:string) => {
    dispatch(setEmployee({users_phone}))
  };
  const setUsersEmail = (users_email:string) => {
    dispatch(setEmployee({users_email}))
  };

  return {
    addEmployee,
    removeEmployee,
    setSedesName,
    setidentificationType,
    setUsersIdentification,
    setUsersName,
    setUsersLastName,
    setUsersAddress,
    setUsersPhone,
    setUsersEmail,
  };
};

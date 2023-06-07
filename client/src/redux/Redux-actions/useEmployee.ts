import { setEmployee, setRemoveEmployee, type Employee } from "../Redux-reducer/employeesSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const addEmployee = (employee: Employee) => {
    dispatch(setEmployee(employee))
  };

  const setSedesName = (sedes_name: string) => {
    dispatch(setEmployee({sedes_name}))
  };

  const removeEmployee = () => {
    dispatch(setRemoveEmployee());
  };

  return {
    addEmployee,
    removeEmployee,
    setSedesName,
  };
};

import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';

const Deductions = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setDp, setOrder, setPayrollDeductionAuthorizationEvents, } = useEmployee();

  // DP
  const [ctPath, setCtPath] = useState("");
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCtPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDp(fileNameEvent);
  };
  // Libranza
  // Autorización de deducción nómina por eventos

  return (
    <div>
      deductions
    </div>
  )
}

export default Deductions

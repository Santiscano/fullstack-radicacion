import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';

const SocialBenefit = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setPremiumServices, setVacation, setSeveranceWithdrawalRequest, setProofOfSeverancePay} = useEmployee();

  // Prima de servicios
  const [ctPath, setCtPath] = useState("");
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCtPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setPremiumServices(fileNameEvent);
  };
  // Vacaciones
  // Solicitud retiro de cesantias
  //  Comprobante de consignacion de cesantías

  return (
    <div>
      social
    </div>
  )
}

export default SocialBenefit

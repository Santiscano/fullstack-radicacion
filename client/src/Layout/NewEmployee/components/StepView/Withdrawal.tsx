import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';

const Withdrawal = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setLetterOfResignation, setLetterOfAcceptance, setContractTermination, setLetterWithdrawalMedicalExamination,
    setWithdrawalMedicalExamination, setFinalSettlement, setEpsWithdrawal, setLayoffsWithdrawal,
    setArlWithdrawal, setCompensationBoxWithdrawal, setDeliveryWorkTool } = useEmployee();

    // Carta de Renuncia
  const [ctPath, setCtPath] = useState("");
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCtPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLetterOfResignation(fileNameEvent);
  };
  // Carta de Aceptacion
  // terminación de contrato
  // carta de examen medico de retiro
  // examen medico de retiro
  // liquidacion definitiva
  // Retiro EPS
  // Retiro Cesantias
  // Retiro ARL
  // Retiro caja de compensación
  // Entrega de herramientas de trabajo

  return (
    <div>
      withdrawal
    </div>
  )
}

export default Withdrawal

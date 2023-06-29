import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';

const Beneficiary = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setMarriageCertificate, setBeneficiaryIdentityCard, setChildrensCivilRegistry,
    setChildrensIdentityCard, setChildrensStudyCertificate} = useEmployee();

  // Partida de Matrimonio
  const [ctPath, setCtPath] = useState("");
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCtPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setMarriageCertificate(fileNameEvent);
  };
  // cedula del beneficiario
  // copia registro civil hijos
  // copia tarjeta identidad hijos
  // certificado de estudios hijos

  return (
    <div>
      beneficiario
    </div>
  )
}

export default Beneficiary

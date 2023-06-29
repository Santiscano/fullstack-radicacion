import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';

const Membership = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setSocialSecurityPayment, setEpsCertificate, setEpsAffiliationCertificate,
    setFpCertificate, setAffiliationCertificateCompensationBox, setLayyoffsCertificate,
    setArlAffiliationCertificate} = useEmployee();

  // Planilla pago seguridad social
  const [ctPath, setCtPath] = useState("");
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCtPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setSocialSecurityPayment(fileNameEvent);
  };
  // Certificado EPS
  // Certificado afiliacion EPS
  // Certificado de FP
  // Certificado de afiliacion caja de compensación
  // Certificado de censantias
  // Certificado de afiliación ARL

  return (
    <div>
      membership
    </div>
  )
}

export default Membership

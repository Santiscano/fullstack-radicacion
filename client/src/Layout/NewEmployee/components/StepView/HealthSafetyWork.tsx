import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';

const HealthSafetyWork = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setMedicalExaminationAdmission, setPeriodicMedicalExamination, setDisabilities,
    setPermitRequest, setEndowment, setPerformanceEvaluation, setDeliveryWorkTools, } = useEmployee();

  // Examen medico ingreso
  const [ctPath, setCtPath] = useState("");
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCtPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setMedicalExaminationAdmission(fileNameEvent);
  };
  // Examen medico periodico
  // incapacidades
  // Solicitud de permisos(personal. votación, actividad laboral, cita EPS, cita ARL, calamidad, beneficio, cumpleaños)
  // dotacion
  // evaluacion de desempeño
  // entrega herramientas de trabajo (TI)

  return (
    <div>
      buenas
    </div>
  )
}

export default HealthSafetyWork

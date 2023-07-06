import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// images
import work_contract from "../../../../assets/svgs/work_contract.svg";


const HealthSafetyWork = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setMedicalExaminationAdmission, setPeriodicMedicalExamination, setDisabilities,
    setPermitRequest, setEndowment, setPerformanceEvaluation, setDeliveryWorkTools, } = useEmployee();

  // Examen medico ingreso
  const [emiPath, setEmiPath] = useState<File | null>();
  const handleEmi = (e: ChangeEvent<HTMLInputElement>) => {
    setEmiPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setMedicalExaminationAdmission(fileNameEvent);
  };
  // Examen medico periodico
  const [empPath, setEmpPath] = useState<File | null>();
  const handleEmp = (e: ChangeEvent<HTMLInputElement>) => {
    setEmpPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, "");
    setPeriodicMedicalExamination(fileNameEvent);
  };
  // incapacidades
  const [incapPath, setIncapPath] = useState<File | null>();
  const handleIncap = (e: ChangeEvent<HTMLInputElement>) => {
    setIncapPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, "");
    setDisabilities(fileNameEvent);
  };
  // Solicitud de permisos(personal. votación, actividad laboral, cita EPS, cita ARL, calamidad, beneficio, cumpleaños)
  const [spPath, setSpPath] = useState<File | null>();
  const handleSp = (e: ChangeEvent<HTMLInputElement>) => {
    setSpPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, "");
    setPermitRequest(fileNameEvent);
  };
  // dotacion
  const [dotPath, setDotPath] = useState<File | null>();
  const handleDot = (e: ChangeEvent<HTMLInputElement>) => {
    setDotPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, "");
    setEndowment(fileNameEvent);
  };
  // evaluacion de desempeño
  const [edPath, setEdPath] = useState<File | null>();
  const handleEd = (e: ChangeEvent<HTMLInputElement>) => {
    setEdPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, "");
    setPerformanceEvaluation(fileNameEvent);
  };
  // entrega herramientas de trabajo (TI)
  const [ehtPath, setEhtPath] = useState<File | null>();
  const handleEht = (e: ChangeEvent<HTMLInputElement>) => {
    setEhtPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, "");
    setDeliveryWorkTools(fileNameEvent)
  };

  // ----------------------submit-----------------------//
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
            Examen medico ingreso
            </label>
            <input type="file" className="hidden" onChange={handleEmi} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.medical_examination_admission} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
            Examen medico periódico<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleEmp} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.periodic_medical_examination} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
            Incapacidades<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleIncap} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.disabilities} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Solicitud de permisos "Personal, Votación, laboral, citas EPS, ARL, calamidad, cumpleaños"<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleSp} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.permit_request} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Dotación<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleDot} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.endowment} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Evalución de desempeño<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleEd} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.performance_evaluation} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
        <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Entrega Herramientas de trabajo "TI"
            </label>
            <input type="file" className="hidden" onChange={handleEht} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.delivery_work_tools} </span>
            </div>
          </label>
        </article>
      </div>
    </form>
  )
}

export default HealthSafetyWork

import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// images
import work_contract from "../../../../assets/svgs/work_contract.svg";
import another_if from "../../../../assets/svgs/another_if.svg";
import confidential from "../../../../assets/svgs/confidential.svg";
import auth_info from "../../../../assets/svgs/auth_info.svg";
import siplaft from "../../../../assets/svgs/siplaft.svg";
import job_description from "../../../../assets/svgs/job_description.svg";
import induction from "../../../../assets/svgs/induction.svg";
import cover_letter from "../../../../assets/svgs/cover_letter.svg";
import human_managment from "../../../../assets/svgs/human_managment.svg";
import home_visit from "../../../../assets/svgs/home_visit.svg";
import fingerprint from "../../../../assets/svgs/fingerprint.svg";


const Hiring = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setWorkContract, setAnotherIf, setConfidentialityAgreement,
    seAuthOwnerInformation, setSinplaftQuery, setJobDescription,
    setInduction, seApprentiteCoverLetter, setHumanManagementConcept,
    setHomeVisit, setFingerprintRegistration } = useEmployee();

  // Contrato de trabajo
  const [ctPath, setCtPath] = useState<File | null>();
  const handleCt = (e: ChangeEvent<HTMLInputElement>) => {
    setCtPath(e.target.files![0]);
    console.log('ctPath: ', ctPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setWorkContract(fileNameEvent);
  };
  // Otro Si
  const [osPath, setOsPath] = useState<File | null>();
  const handleOs = (e: ChangeEvent<HTMLInputElement>) => {
    setOsPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setAnotherIf(fileNameEvent);
  };
  // Acuerdo Confidencialidad
  const [acPath, setAcPath] = useState<File | null>();
  const handleAc = (e: ChangeEvent<HTMLInputElement>) => {
    setAcPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setConfidentialityAgreement(fileNameEvent);
  };
  // Autorización como titular de la información
  const [atiPath, setAtiPath] = useState<File | null>();
  const handleAti = (e: ChangeEvent<HTMLInputElement>) => {
    setAtiPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    seAuthOwnerInformation(fileNameEvent);
  };
  // Consulta de Siplaft
  const [csPath, setCsPath] = useState<File | null>();
  const handleCs = (e: ChangeEvent<HTMLInputElement>) => {
    setCsPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setSinplaftQuery(fileNameEvent);
  };
  // Descripcion Cargo
  const [dcPath, setDcPath] = useState<File | null>();
  const handleDc = (e: ChangeEvent<HTMLInputElement>) => {
    setDcPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setJobDescription(fileNameEvent);
  };
  // Inducción
  const [inductionPath, setInductionPath] = useState<File | null>();
  const handleInduction = (e: ChangeEvent<HTMLInputElement>) => {
    setInductionPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setInduction(fileNameEvent);
  };
  // Carta de presentación Aprendiz
  const [cpaPath, setCpaPath] = useState<File | null>();
  const handleCpa = (e: ChangeEvent<HTMLInputElement>) => {
    setCpaPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    seApprentiteCoverLetter(fileNameEvent);
  };
  // Concepto gestión humana
  const [cghPath, setCghPath] = useState<File | null>();
  const handleCgh = (e: ChangeEvent<HTMLInputElement>) => {
    setCghPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setHumanManagementConcept(fileNameEvent);
  };
  // Visita domiciliaria
  const [vdPath, setVdPath] = useState<File | null>();
  const handleVd = (e: ChangeEvent<HTMLInputElement>) => {
    setVdPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setHomeVisit(fileNameEvent);
  };
  // Registro de huellas dactilares
  const [rhdPath, setRhdPath] = useState<File | null>();
  const handleRhd = (e: ChangeEvent<HTMLInputElement>) => {
    setRhdPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setFingerprintRegistration(fileNameEvent);
  };

  // ----------------------submit-----------------------//
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ctPath: ', ctPath);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Contrato de trabajo<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleCt} />
              <div className="flex cursor-pointer">
                <img src={work_contract} width="100px" />
                <span className="flex items-center"> {employee.work_contract} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Otro Si<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleOs} />
              <div className="flex cursor-pointer">
                <img src={another_if} width="100px" />
                <span className="flex items-center"> {employee.another_if} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Acuerdo Confidencialidad<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleAc} />
              <div className="flex cursor-pointer">
                <img src={confidential} width="100px" />
                <span className="flex items-center"> {employee.confidentiality_agreement} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Autorización como titular de la información<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleAti} />
              <div className="flex cursor-pointer">
                <img src={auth_info} width="100px" />
                <span className="flex items-center"> {employee.auth_owner_information} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Consulta de Siplaft<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleCs} />
              <div className="flex cursor-pointer">
                <img src={siplaft} width="100px" />
                <span className="flex items-center"> {employee.siplaft_query} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Descripción de cargo<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleDc} />
              <div className="flex cursor-pointer">
                <img src={job_description} width="100px" />
                <span className="flex items-center"> {employee.job_description} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Inducción<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleInduction} />
              <div className="flex cursor-pointer">
                <img src={induction} width="100px" />
                <span className="flex items-center"> {employee.induction} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Carta de presentación Aprendiz<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleCpa} />
              <div className="flex cursor-pointer">
                <img src={cover_letter} width="100px" />
                <span className="flex items-center"> {employee.apprentice_cover_letter} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Concepto gestión humana<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleCgh} />
              <div className="flex cursor-pointer">
                <img src={human_managment} width="100px" />
                <span className="flex items-center"> {employee.human_management_concept} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Visita domiciliaria<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleVd} />
              <div className="flex cursor-pointer">
                <img src={home_visit} width="100px" />
                <span className="flex items-center"> {employee.home_visit} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Registro de huellas dactilares<strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleRhd} />
              <div className="flex cursor-pointer">
                <img src={fingerprint} width="100px" />
                <span className="flex items-center"> {employee.fingerprint_registration} </span>
              </div>
            </label>
          </article>
        </div>
        <button
          type="submit"
          className="button button--flex bg-[#037543]"
        >cargar</button>
      </form>
    </>
  )
}

export default Hiring

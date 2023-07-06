import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// images
import work_contract from "../../../../assets/svgs/work_contract.svg";

const WithdrawalEdit = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setLetterOfResignation, setLetterOfAcceptance, setContractTermination, setLetterWithdrawalMedicalExamination,
    setWithdrawalMedicalExamination, setFinalSettlement, setEpsWithdrawal, setLayoffsWithdrawal,
    setArlWithdrawal, setCompensationBoxWithdrawal, setDeliveryWorkTool } = useEmployee();

    // Carta de Renuncia
  const [crPath, setCrPath] = useState<File | null>();
  const handleCr = (e: ChangeEvent<HTMLInputElement>) => {
    setCrPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLetterOfResignation(fileNameEvent);
  };
  // Carta de Aceptacion
  const [caPath, setCaPath] = useState<File | null>();
  const handleCa = (e: ChangeEvent<HTMLInputElement>) => {
    setCaPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLetterOfAcceptance(fileNameEvent)
  };
  // terminación de contrato
  const [tcPath, setTcPath] = useState<File | null>();
  const handleTc = (e: ChangeEvent<HTMLInputElement>) => {
    setTcPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setContractTermination(fileNameEvent)
  };
  // carta de examen medico de retiro
  const [cemrPath, setCemrPath] = useState<File | null>();
  const handleCemr = (e: ChangeEvent<HTMLInputElement>) => {
    setCemrPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLetterWithdrawalMedicalExamination(fileNameEvent)
  };
  // examen medico de retiro
  const [emrPath, setEmrPath] = useState<File | null>();
  const handleEmr = (e: ChangeEvent<HTMLInputElement>) => {
    setEmrPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setWithdrawalMedicalExamination(fileNameEvent)
  };
  // liquidacion definitiva
  const [ldPath, setLdPath] = useState<File | null>();
  const handleLd = (e: ChangeEvent<HTMLInputElement>) => {
    setLdPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setFinalSettlement(fileNameEvent)
  };
  // Retiro EPS
  const [repsPath, setRepsPath] = useState<File | null>();
  const handleReps = (e: ChangeEvent<HTMLInputElement>) => {
    setRepsPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setEpsWithdrawal(fileNameEvent)
  };
  // Retiro Cesantias
  const [rcPath, setRcPath] = useState<File | null>();
  const handleRc = (e: ChangeEvent<HTMLInputElement>) => {
    setRcPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLayoffsWithdrawal(fileNameEvent)
  };
  // Retiro ARL
  const [rarlPath, setRarlPath] = useState<File | null>();
  const handleRarl = (e: ChangeEvent<HTMLInputElement>) => {
    setRarlPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setArlWithdrawal(fileNameEvent)
  };
  // Retiro caja de compensación
  const [rccPath, setRccPath] = useState<File | null>();
  const handleRcc = (e: ChangeEvent<HTMLInputElement>) => {
    setRccPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setCompensationBoxWithdrawal(fileNameEvent)
  };
  // Entrega de herramientas de trabajo
  const [ehtPath, setEhtPath] = useState<File | null>();
  const handleEht = (e: ChangeEvent<HTMLInputElement>) => {
    setEhtPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDeliveryWorkTool(fileNameEvent)
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
              Carta de renuncia
            </label>
            <input type="file" className="hidden" onChange={handleCr} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.letter_of_resignation} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Carta de Aceptación
            </label>
            <input type="file" className="hidden" onChange={handleCa} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.letter_of_acceptance} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Terminación de contrato
            </label>
            <input type="file" className="hidden" onChange={handleTc} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.contract_termination} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Carta de examen medico de retiro
            </label>
            <input type="file" className="hidden" onChange={handleCemr} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.letter_withdrawal_medical_examination} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Examen medico de retiro
            </label>
            <input type="file" className="hidden" onChange={handleEmr} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.withdrawal_medical_examination} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Liquidación definitiva
            </label>
            <input type="file" className="hidden" onChange={handleLd} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.final_settlement} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Retiro EPS
            </label>
            <input type="file" className="hidden" onChange={handleReps} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.eps_withdrawal} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Retiro Cesantías
            </label>
            <input type="file" className="hidden" onChange={handleRc} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.layoffs_withdrawal} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Retiro ARL
            </label>
            <input type="file" className="hidden" onChange={handleRarl} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.arl_withdrawal} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Retiro Caja de compensación
            </label>
            <input type="file" className="hidden" onChange={handleRcc} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.compensation_box_withdrawal} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Entrega de herramientas de trabajo
            </label>
            <input type="file" className="hidden" onChange={handleEht} />
            <div className="flex cursor-pointer">
              <img src={work_contract} width="100px" />
              <span className="flex items-center"> {employee.delivery_work_tool} </span>
            </div>
          </label>
        </article>
      </div>
    </form>
  )
}

export default WithdrawalEdit

import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// images
import premium_services from "../../../../assets/svgs/premium_services.svg";
import vacation from "../../../../assets/svgs/vacation.svg";
import severance_withdrawal_request from "../../../../assets/svgs/severance_withdrawal_request.svg";
import proof_of_severance_pay from "../../../../assets/svgs/proof_of_severance_pay.svg";


const SocialBenefit = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setPremiumServices, setVacation, setSeveranceWithdrawalRequest,
    setProofOfSeverancePay} = useEmployee();

  // Prima de servicios
  const [psPath, setPsPath] = useState<File | null>();
  const handlePs = (e: ChangeEvent<HTMLInputElement>) => {
    setPsPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setPremiumServices(fileNameEvent);
  };
  // Vacaciones
  const [vacPath, setVacPath] = useState<File | null>();
  const handleVac = (e: ChangeEvent<HTMLInputElement>) => {
    setVacPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVacation(fileNameEvent);
  };
  // Solicitud retiro de cesantias
  const [srcPath, setSrcPath] = useState<File | null>();
  const handleSrc = (e: ChangeEvent<HTMLInputElement>) => {
    setSrcPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setSeveranceWithdrawalRequest(fileNameEvent);
  };
  //  Comprobante de consignacion de cesantías
  const [cccPath, setCccPath] = useState<File | null>();
  const handleCcc = (e: ChangeEvent<HTMLInputElement>) => {
    setCccPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setProofOfSeverancePay(fileNameEvent);
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
              Prima de servicio<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handlePs} />
            <div className="flex cursor-pointer">
              <img src={premium_services} width="100px" />
              <span className="flex items-center"> {employee.premium_services} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Vacaciones<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleVac} />
            <div className="flex cursor-pointer">
              <img src={vacation} width="100px" />
              <span className="flex items-center"> {employee.vacation} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Solicitud retiro de cesantías<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleSrc} />
            <div className="flex cursor-pointer">
              <img src={severance_withdrawal_request} width="100px" />
              <span className="flex items-center"> {employee.severance_withdrawal_request} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Comprobante de consignacion de cesantías<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleCcc} />
            <div className="flex cursor-pointer">
              <img src={proof_of_severance_pay} width="100px" />
              <span className="flex items-center"> {employee.proof_of_severance_pay} </span>
            </div>
          </label>
        </article>
      </div>
      <button
          type="submit"
          className="button button--flex bg-[#037543]"
        >cargar</button>
    </form>
  )
}

export default SocialBenefit

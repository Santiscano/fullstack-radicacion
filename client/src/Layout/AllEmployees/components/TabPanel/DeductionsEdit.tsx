import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// images
import dp from "../../../../assets/svgs/dp.svg";
import order from "../../../../assets/svgs/order.svg";
import payroll_deduction_authorization_events from "../../../../assets/svgs/payroll_deduction_authorization_events.svg";

const DeductionsEdit = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setDp, setOrder, setPayrollDeductionAuthorizationEvents, } = useEmployee();

  // DP
  const [dpPath, setdpPath] = useState<File | null>();
  const handledp = (e: ChangeEvent<HTMLInputElement>) => {
    setdpPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDp(fileNameEvent);
  };
  // Libranza
  const [libPath, setLibPath] = useState<File | null>();
  const handleLib = (e: ChangeEvent<HTMLInputElement>) => {
    setLibPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setOrder(fileNameEvent);
  };
  // Autorización de deducción nómina por eventos
  const [adnePath, setAdne] = useState<File | null>();
  const handleAdne = (e: ChangeEvent<HTMLInputElement>) => {
    setAdne(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setPayrollDeductionAuthorizationEvents(fileNameEvent);
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
              DP<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handledp} />
            <div className="flex cursor-pointer">
              <img src={dp} width="100px" />
              <span className="flex items-center"> {employee.dp} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Libranzas<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleLib} />
            <div className="flex cursor-pointer">
              <img src={order} width="100px" />
              <span className="flex items-center"> {employee.order} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Autorización de deducción por eventos<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handleAdne} />
            <div className="flex cursor-pointer">
              <img src={payroll_deduction_authorization_events} width="100px" />
              <span className="flex items-center"> {employee.payroll_deduction_authorization_events} </span>
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

export default DeductionsEdit

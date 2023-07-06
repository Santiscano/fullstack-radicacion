import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// image
import marriage_certificate from "../../../../assets/svgs/marriage_certificate.svg";
import beneficiary_identity_card from "../../../../assets/svgs/beneficiary_identity_card.svg";
import childrens_civil_registry from "../../../../assets/svgs/childrens_civil_registry.svg";
import childrens_identity_card from "../../../../assets/svgs/childrens_identity_card.svg";
import childrens_study_certificate from "../../../../assets/svgs/childrens_study_certificate.svg";

const Beneficiary = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setMarriageCertificate, setBeneficiaryIdentityCard, setChildrensCivilRegistry,
    setChildrensIdentityCard, setChildrensStudyCertificate} = useEmployee();

  // Partida de Matrimonio
  const [pmPath, setPmPath] = useState<File | null>();
  const handlePm = (e: ChangeEvent<HTMLInputElement>) => {
    setPmPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setMarriageCertificate(fileNameEvent);
  };
  // cedula del beneficiario
  const [cbPath, setCbPath] = useState<File | null>();
  const handleCb = (e: ChangeEvent<HTMLInputElement>) => {
    setCbPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setBeneficiaryIdentityCard(fileNameEvent);
  };
  // copia registro civil hijos
  const [crchPath, setCrchPath] = useState<File | null>();
  const handleCrch = (e: ChangeEvent<HTMLInputElement>) => {
    setCrchPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setChildrensCivilRegistry(fileNameEvent);
  };
  // copia tarjeta identidad hijos
  const [ctihPath, setCtihPath] = useState<File | null>();
  const handleCtih = (e: ChangeEvent<HTMLInputElement>) => {
    setCtihPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setChildrensIdentityCard(fileNameEvent);
  };
  // certificado de estudios hijos
  const [cehPath, setCehPath] = useState<File | null>();
  const handleCeh = (e: ChangeEvent<HTMLInputElement>) => {
    setCehPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setChildrensStudyCertificate(fileNameEvent);
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
              Partida de matrimonio/extrajuicio
            </label>
            <input type="file" className="hidden" onChange={handlePm} />
            <div className="flex cursor-pointer">
              <img src={marriage_certificate} width="100px" />
              <span className="flex items-center"> {employee.marriage_certificate} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Cedula del beneficiario
            </label>
            <input type="file" className="hidden" onChange={handleCb} />
            <div className="flex cursor-pointer">
              <img src={beneficiary_identity_card} width="100px" />
              <span className="flex items-center"> {employee.beneficiary_identity_card} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Copia de registro civil hijos
            </label>
            <input type="file" className="hidden" onChange={handleCrch} />
            <div className="flex cursor-pointer">
              <img src={childrens_civil_registry} width="100px" />
              <span className="flex items-center"> {employee.childrens_civil_registry} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Copia de Tarjeta de identidad hijos
            </label>
            <input type="file" className="hidden" onChange={handleCtih} />
            <div className="flex cursor-pointer">
              <img src={childrens_identity_card} width="100px" />
              <span className="flex items-center"> {employee.childrens_identity_card} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de estudio hijos
            </label>
            <input type="file" className="hidden" onChange={handleCeh} />
            <div className="flex cursor-pointer">
              <img src={childrens_study_certificate} width="100px" />
              <span className="flex items-center"> {employee.childrens_study_certificate} </span>
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

export default Beneficiary

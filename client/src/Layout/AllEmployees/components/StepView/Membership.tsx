import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks/useStore';
import { useEmployee } from '../../../../redux/Redux-actions/useEmployee';
// image
import social_security_payment from "../../../../assets/svgs/social_security_payment.svg";
import eps_certificate from "../../../../assets/svgs/eps_certificate.svg";
import eps_affiliation_certificate from "../../../../assets/svgs/eps_affiliation_certificate.svg";
import fp_certificate from "../../../../assets/svgs/fp_certificate.svg";
import affiliation_certificate_compensation_box from "../../../../assets/svgs/affiliation_certificate_compensation_box.svg";
import layyoffs_certificate from "../../../../assets/svgs/layyoffs_certificate.svg";
import arl_affiliation_certificate from "../../../../assets/svgs/arl_affiliation_certificate.svg";

const Membership = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setSocialSecurityPayment, setEpsCertificate, setEpsAffiliationCertificate,
    setFpCertificate, setAffiliationCertificateCompensationBox, setLayyoffsCertificate,
    setArlAffiliationCertificate } = useEmployee();

  // Planilla pago seguridad social
  const [ppssPath, setPpssPath] = useState<File | null>();
  const handlePpss = (e: ChangeEvent<HTMLInputElement>) => {
    setPpssPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setSocialSecurityPayment(fileNameEvent);
  };
  // Certificado EPS
  const [cepsPath, setCepsPath] = useState<File | null>();
  const handleCeps = (e: ChangeEvent<HTMLInputElement>) => {
    setCepsPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setEpsCertificate(fileNameEvent);
  };
  // Certificado afiliacion EPS
  const [caepsPath, setCaepsPath] = useState<File | null>();
  const handleCaeps = (e: ChangeEvent<HTMLInputElement>) => {
    setCaepsPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setEpsAffiliationCertificate(fileNameEvent);
  };
  // Certificado de FP
  const [cfpPath, setCfpPath] = useState<File | null>();
  const handleCfp = (e: ChangeEvent<HTMLInputElement>) => {
    setCfpPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setFpCertificate(fileNameEvent);
  };
  // Certificado de afiliacion caja de compensación
  const [caccPath, setCaccPath] = useState<File | null>();
  const handleCacc = (e: ChangeEvent<HTMLInputElement>) => {
    setCaccPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setAffiliationCertificateCompensationBox(fileNameEvent);
  };
  // Certificado de censantias
  const [ccPath, setCcPath] = useState<File | null>();
  const handleCc = (e: ChangeEvent<HTMLInputElement>) => {
    setCcPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLayyoffsCertificate(fileNameEvent);
  };
  // Certificado de afiliación ARL
  const [caarlPath, setCaarlPath] = useState<File | null>();
  const handleCaarl = (e: ChangeEvent<HTMLInputElement>) => {
    setCaarlPath(e.target.files![0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setArlAffiliationCertificate(fileNameEvent);
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
              Planilla pago seguridad social<strong className="text-red-600">*</strong>
            </label>
            <input type="file" className="hidden" onChange={handlePpss} />
            <div className="flex cursor-pointer">
              <img src={social_security_payment} width="100px" />
              <span className="flex items-center"> {employee.social_security_payment} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de EPS
            </label>
            <input type="file" className="hidden" onChange={handleCeps} />
            <div className="flex cursor-pointer">
              <img src={eps_certificate} width="100px" />
              <span className="flex items-center"> {employee.eps_certificate} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de afiliación EPS
            </label>
            <input type="file" className="hidden" onChange={handleCaeps} />
            <div className="flex cursor-pointer">
              <img src={eps_affiliation_certificate} width="100px" />
              <span className="flex items-center"> {employee.eps_affiliation_certificate} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de FP
            </label>
            <input type="file" className="hidden" onChange={handleCfp} />
            <div className="flex cursor-pointer">
              <img src={fp_certificate} width="100px" />
              <span className="flex items-center"> {employee.fp_certificate} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de afiliacion a caja de compensación
            </label>
            <input type="file" className="hidden" onChange={handleCacc} />
            <div className="flex cursor-pointer">
              <img src={affiliation_certificate_compensation_box} width="100px" />
              <span className="flex items-center"> {employee.affiliation_certificate_compensation_box} </span>
            </div>
          </label>
        </article>
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de Cesantías
            </label>
            <input type="file" className="hidden" onChange={handleCc} />
            <div className="flex cursor-pointer">
              <img src={layyoffs_certificate} width="100px" />
              <span className="flex items-center"> {employee.layyoffs_certificate} </span>
            </div>
          </label>
        </article>
      </div>
      <div className="md:flex md:flex-wrap">
        <article className="md:w-1/3">
          <label className="block">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Certificado de afiliación ARL
            </label>
            <input type="file" className="hidden" onChange={handleCaarl} />
            <div className="flex cursor-pointer">
              <img src={arl_affiliation_certificate} width="100px" />
              <span className="flex items-center"> {employee.arl_affiliation_certificate} </span>
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

export default Membership

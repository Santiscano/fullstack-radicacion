import { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import PersonIcon from "@mui/icons-material/Person";
// images
import cv from "../../../../assets/svgs/cv_hiring.svg";
import doc from "../../../../assets/svgs/personalInformation.svg";
import license from '../../../../assets/svgs/license.svg';
import militarCard from "../../../../assets/svgs/militarCard.svg";
import driveCard from '../../../../assets/svgs/driveCard.svg';
import certify from "../../../../assets/svgs/certify.svg";
import bachelor from '../../../../assets/svgs/bachelor.svg';
import technique from '../../../../assets/svgs/technique.svg';
import technology from '../../../../assets/svgs/technology.svg';
import professional from '../../../../assets/svgs/professional.svg';
import posgrade from '../../../../assets/svgs/posgrado.svg';
import certifyBank from '../../../../assets/svgs/certifyBank.svg';
import referenceAcademic from '../../../../assets/svgs/referenceAcademi.svg';
import referencePersonal from '../../../../assets/svgs/referencePersonal.svg';
import referenceWork from '../../../../assets/svgs/referenceJob.svg';
import verificWork from '../../../../assets/svgs/verificJob.svg';
import verificPersonal from '../../../../assets/svgs/verificPersonal.svg';
import verificAcademic from '../../../../assets/svgs/verificAcademic.svg';
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";
//
const Identification = () => {
  // imports globals
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setCvName, setdiName, setLcName, setLmName, setDvName, setDnpvName, setDbName, setTName, setTecName, setProfName,setPosgName,
    setCbName,setRpName, setRaName, setRlName, setVrlName, setVrpName, setVraName } = useEmployee();

  // hoja de vida
  const [cvPath, setCvPath] = useState("");
  const handleCV = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCvPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setCvName(fileNameEvent);
  };
  // documento de identidad
  const [diPath, setDiPath] = useState("");
  const handleDi = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setDiPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setdiName(fileNameEvent);
  };
  // licencia de conduccion
  const [lcPath, setLcPath] = useState("");
  const handleLc = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setLcPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLcName(fileNameEvent);
  };
  // Libreta Militar
  const [lmPath, setLmPath] = useState("");
  const handleLm = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setLmPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLmName(fileNameEvent);
  };
  // Documentos Vehiculo
  const [dvPath, setDvPath] = useState("");
  const handleDv = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setDvPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDvName(fileNameEvent);
  };
  // Documento Notario Propietario Vehiculo
  const [dnpvPath, setDnpvPath] = useState("");
  const handleDnpv = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setDnpvPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDnpvName(fileNameEvent);
  };
  // Documento Bachiller
  const [dbPath, setDbPath] = useState("");
  const handleDb = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setDbPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDbName(fileNameEvent);
  };
  // Tecnica
  const [tPath, setTPath] = useState("");
  const handleT = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setTPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setTName(fileNameEvent);
  };
  // Tecnologia
  const [tecPath, setTecPath] = useState("");
  const handleTec = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setTecPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setTecName(fileNameEvent);
  };
  // Profesional
  const [ProfPath, setProfPath] = useState("");
  const handleProf = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setProfPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setProfName(fileNameEvent);
  };
  // posgrado
  const [posgPath, setPosgPath] = useState("");
  const handlePosg = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setPosgPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setPosgName(fileNameEvent);
  };
  // Certificado Bancario
  const [cbPath, setCbPath] = useState("");
  const handleCb = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCbPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setCbName(fileNameEvent);
  };
  // Referencia Personal
  const [rpPath, setRpPath] = useState("");
  const handleRp = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setRpPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setRpName(fileNameEvent);
  };
  // Referencia Academica
  const [raPath, setRaPath] = useState("");
  const handleRa = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setRaPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setRaName(fileNameEvent);
  };
  // Referencias Laborales
  const [rlPath, setRlPath] = useState("");
  const handleRl = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setRlPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setRlName(fileNameEvent);
  };
  // Verificacion de referencias laborales
  const [vrlPath, setVrlPath] = useState("");
  const handleVrl = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setVrlPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVrlName(fileNameEvent);
  };
  // verificacion de referencias personales
  const [vrpPath, setVrpPath] = useState("");
  const handleVrp = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setVrpPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVrpName(fileNameEvent);
  };
  // verificacion de referencias academicas
  const [vraPath, setVraPath] = useState("");
  const handleVra = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setVraPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVraName(fileNameEvent);
  };

  // ----------------------submit-----------------------//
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Hoja De Vida{" "}
              </label>
              <input type="file" className="hidden" onChange={handleCV} />
              <div className="flex cursor-pointer">
                <img src={cv} width="100px" />
                <span className="flex items-center"> {employee.cv_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documento De Identidad{" "}
              </label>
              <input type="file" className="hidden" onChange={handleDi} />
              <div className="flex cursor-pointer">
                <img src={doc} width="100px" />
                <span className="flex items-center"> {employee.document_type_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Licencia De Conduccion{" "}
              </label>
              <input type="file" className="hidden" onChange={handleLc} />
              <div className="flex cursor-pointer">
                <img src={license} width="100px" />
                <span className="flex items-center"> {employee.driveing_license_document} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Libreta Militar{" "}
              </label>
              <input type="file" className="hidden" onChange={handleLm} />
              <div className="flex cursor-pointer">
                <img src={militarCard} width="100px" />
                <span className="flex items-center"> {employee.military_card_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documentos Vehiculo{" "}
              </label>
              <input type="file" className="hidden" onChange={handleDv} />
              <div className="flex cursor-pointer">
                <img src={driveCard} width="100px" />
                <span className="flex items-center"> {employee.vehicle_documents} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documento Notario Propietario Vehiculo{" "}
              </label>
              <input type="file" className="hidden" onChange={handleDnpv} />
              <div className="flex cursor-pointer">
                <img src={certify} width="100px" />
                <span className="flex items-center"> {employee.notary_document} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documento Bachiller{" "}
              </label>
              <input type="file" className="hidden" onChange={handleDb} />
              <div className="flex cursor-pointer">
                <img src={bachelor} width="100px" />
                <span className="flex items-center"> {employee.bachelor_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Tecnica{" "}
              </label>
              <input type="file" className="hidden" onChange={handleT} />
              <div className="flex cursor-pointer">
                <img src={technique} width="100px" />
                <span className="flex items-center"> {employee.technique_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Tecnologia{" "}
              </label>
              <input type="file" className="hidden" onChange={handleTec} />
              <div className="flex cursor-pointer">
                <img src={technology} width="100px" />
                <span className="flex items-center"> {employee.technology_document} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Profesional{" "}
              </label>
              <input type="file" className="hidden" onChange={handleProf} />
              <div className="flex cursor-pointer">
                <img src={professional} width="100px" />
                <span className="flex items-center"> {employee.professional_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                posgrado{" "}
              </label>
              <input type="file" className="hidden" onChange={handlePosg} />
              <div className="flex cursor-pointer">
                <img src={posgrade} width="100px" />
                <span className="flex items-center"> {employee.postgraduate_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Certificado Bancario{" "}
              </label>
              <input type="file" className="hidden" onChange={handleCb} />
              <div className="flex cursor-pointer">
                <img src={certifyBank} width="100px" />
                <span className="flex items-center"> {employee.bank_certificate_document} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Referencia personal{" "}
              </label>
              <input type="file" className="hidden" onChange={handleRp} />
              <div className="flex cursor-pointer">
                <img src={referencePersonal} width="100px" />
                <span className="flex items-center"> {employee.personal_reference_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Referencia Academica{" "}
              </label>
              <input type="file" className="hidden" onChange={handleRa} />
              <div className="flex cursor-pointer">
                <img src={referenceAcademic} width="100px" />
                <span className="flex items-center"> {employee.academic_reference_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Referencias Laborales{" "}
              </label>
              <input type="file" className="hidden" onChange={handleRl} />
              <div className="flex cursor-pointer">
                <img src={referenceWork} width="100px" />
                <span className="flex items-center"> {employee.work_reference_document} </span>
              </div>
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Verificación de Referencias Laborares{" "}
              </label>
              <input type="file" className="hidden" onChange={handleVrl} />
              <div className="flex cursor-pointer">
                <img src={verificWork} width="100px" />
                <span className="flex items-center"> {employee.employment_work_reference} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Verificación de referencias personales{" "}
              </label>
              <input type="file" className="hidden" onChange={handleVrp} />
              <div className="flex cursor-pointer">
                <img src={verificPersonal} width="100px" />
                <span className="flex items-center"> {employee.employment_personal_reference} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Verificación de Referencias Academicas{" "}
              </label>
              <input type="file" className="hidden" onChange={handleVra} />
              <div className="flex cursor-pointer">
                <img src={verificAcademic} width="100px" />
                <span className="flex items-center"> {employee.employment_academic_reference} </span>
              </div>
            </label>
          </article>
        </div>
      </form>
    </>
  );
};

export default Identification;

import { ChangeEvent, FormEvent, useState, FC } from "react";
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
import axios from "axios";
import { getHeaderMultipart } from "../../../../components/tools/SesionSettings";
//
const Identification: FC<{handleNext:()=>void}> = ({handleNext}) => {
  // imports globals
  const employee = useAppSelector((state) => state.employeesSlice);
  const { setCvName, setdiName, setLcName, setLmName, setDvName, setDnpvName, setDbName, setTName, setTecName, setProfName,setPosgName,
    setCbName,setRpName, setRaName, setRlName, setVrlName, setVrpName, setVraName } = useEmployee();

  // hoja de vida
  const [cvPath, setCvPath] = useState<File | null>();
  const handleCV = (e: ChangeEvent<HTMLInputElement>) => {
    setCvPath(e.target.files![0]);
    console.log("cdpath",cvPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setCvName(fileNameEvent);
  };
  // documento de identidad
  const [diPath, setDiPath] = useState<File | null>();
  const handleDi = (e: ChangeEvent<HTMLInputElement>) => {
    setDiPath(e.target.files![0]);
    console.log('diPath: ', diPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setdiName(fileNameEvent);
  };
  // licencia de conduccion
  const [lcPath, setLcPath] = useState<File | null>();
  const handleLc = (e: ChangeEvent<HTMLInputElement>) => {
    setLcPath(e.target.files![0]);
    console.log('lcPath: ', lcPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLcName(fileNameEvent);
  };
  // Libreta Militar
  const [lmPath, setLmPath] = useState<File | null>();
  const handleLm = (e: ChangeEvent<HTMLInputElement>) => {
    setLmPath(e.target.files![0]);
    console.log('lmPath: ', lmPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setLmName(fileNameEvent);
  };
  // Documentos Vehiculo
  const [dvPath, setDvPath] = useState<File | null>();
  const handleDv = (e: ChangeEvent<HTMLInputElement>) => {
    setDvPath(e.target.files![0]);
    console.log('dvPath: ', dvPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDvName(fileNameEvent);
  };
  // Documento Notario Propietario Vehiculo
  const [dnpvPath, setDnpvPath] = useState<File | null>();
  const handleDnpv = (e: ChangeEvent<HTMLInputElement>) => {
    setDnpvPath(e.target.files![0]);
    console.log('dnpvPath: ', dnpvPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDnpvName(fileNameEvent);
  };
  // Documento Bachiller
  const [dbPath, setDbPath] = useState<File | null>();
  const handleDb = (e: ChangeEvent<HTMLInputElement>) => {
    setDbPath(e.target.files![0]);
    console.log('dbPath: ', dbPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setDbName(fileNameEvent);
  };
  // Tecnica
  const [tPath, setTPath] = useState<File | null>();
  const handleT = (e: ChangeEvent<HTMLInputElement>) => {
    setTPath(e.target.files![0]);
    console.log('tPath: ', tPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setTName(fileNameEvent);
  };
  // Tecnologia
  const [tecPath, setTecPath] = useState<File | null>();
  const handleTec = (e: ChangeEvent<HTMLInputElement>) => {
    setTecPath(e.target.files![0]);
    console.log('tecPath: ', tecPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setTecName(fileNameEvent);
  };
  // Profesional
  const [ProfPath, setProfPath] = useState<File | null>();
  const handleProf = (e: ChangeEvent<HTMLInputElement>) => {
    setProfPath(e.target.files![0]);
    console.log('ProfPath: ', ProfPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setProfName(fileNameEvent);
  };
  // posgrado
  const [posgPath, setPosgPath] = useState<File | null>();
  const handlePosg = (e: ChangeEvent<HTMLInputElement>) => {
    setPosgPath(e.target.files![0]);
    console.log('posgPath: ', posgPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setPosgName(fileNameEvent);
  };
  // Certificado Bancario
  const [cbPath, setCbPath] = useState<File | null>();
  const handleCb = (e: ChangeEvent<HTMLInputElement>) => {
    setCbPath(e.target.files![0]);
    console.log('cbPath: ', cbPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setCbName(fileNameEvent);
  };
  // Referencia Personal
  const [rpPath, setRpPath] = useState<File | null>();
  const handleRp = (e: ChangeEvent<HTMLInputElement>) => {
    setRpPath(e.target.files![0]);
    console.log('rpPath: ', rpPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setRpName(fileNameEvent);
  };
  // Referencia Academica
  const [raPath, setRaPath] = useState<File | null>();
  const handleRa = (e: ChangeEvent<HTMLInputElement>) => {
    setRaPath(e.target.files![0]);
    console.log('raPath: ', raPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setRaName(fileNameEvent);
  };
  // Referencias Laborales
  const [rlPath, setRlPath] = useState<File | null>();
  const handleRl = (e: ChangeEvent<HTMLInputElement>) => {
    setRlPath(e.target.files![0]);
    console.log('rlPath: ', rlPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setRlName(fileNameEvent);
  };
  // Verificacion de referencias laborales
  const [vrlPath, setVrlPath] = useState<File | null>();
  const handleVrl = (e: ChangeEvent<HTMLInputElement>) => {
    setVrlPath(e.target.files![0]);
    console.log('vrlPath: ', vrlPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVrlName(fileNameEvent);
  };
  // verificacion de referencias personales
  const [vrpPath, setVrpPath] = useState<File | null>();
  const handleVrp = (e: ChangeEvent<HTMLInputElement>) => {
    setVrpPath(e.target.files![0]);
    console.log('vrpPath: ', vrpPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVrpName(fileNameEvent);
  };
  // verificacion de referencias academicas
  const [vraPath, setVraPath] = useState<File | null>();
  const handleVra = (e: ChangeEvent<HTMLInputElement>) => {
    setVraPath(e.target.files![0]);
    console.log('vraPath: ', vraPath);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setVraName(fileNameEvent);
  };

  // ----------------------submit-----------------------//
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('object')
    // console.log(cvPath);
    // console.log(diPath);
    // console.log(lcPath);
    // console.log(lmPath);
    // axios.post("route", data, getHeaderMultipart())
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Hoja De Vida <strong className="text-red-600">*</strong>
              </label>
              <input type="file" className="hidden" onChange={handleCV} required/>
              <div className="flex cursor-pointer">
                <img src={cv} width="100px" />
                <span className="flex items-center"> {employee.cv_document} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Documento De Identidad
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
                Licencia De Conduccion<strong className="text-red-600">*</strong>
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
                Libreta Militar
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
                Documentos Vehiculo<strong className="text-red-600">*</strong>
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
                Documento Notario Propietario Vehiculo<strong className="text-red-600">*</strong>
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
                Documento Bachiller
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
                Tecnica
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
                Tecnologia
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
                Profesional
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
                posgrado
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
                Certificado Bancario<strong className="text-red-600">*</strong>
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
                Referencia personal
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
                Referencia Academica
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
                Referencias Laborales
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
                Verificación de Referencias Laborares
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
                Verificación de referencias personales
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
                Verificación de Referencias Academicas
              </label>
              <input type="file" className="hidden" onChange={handleVra} />
              <div className="flex cursor-pointer">
                <img src={verificAcademic} width="100px" />
                <span className="flex items-center"> {employee.employment_academic_reference} </span>
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
  );
};

export default Identification;

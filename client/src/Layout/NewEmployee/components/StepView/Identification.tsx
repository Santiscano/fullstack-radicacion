import { ChangeEvent, useState } from "react";
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
//
const Identification = () => {
  const employee = useAppSelector((state) => state.employeesSlice);
  const [cvPath, setCvPath] = useState("");
  const [cvName, setCvName] = useState("cvSanti.pdf");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setCvPath(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setCvName(fileNameEvent);
  };
  return (
    <>
      <form>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Hoja De Vida{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={cv} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documento De Identidad{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={doc} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Licencia De Conduccion{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={license} width="100px" />
                <span className="flex items-center"> {cvName} </span>
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
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={militarCard} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documentos Vehiculo{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={driveCard} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Documento Notario Propietario Vehiculo{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={certify} width="100px" />
                <span className="flex items-center"> {cvName} </span>
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
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={bachelor} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Tecnica{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={technique} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Tecnologia{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={technology} width="100px" />
                <span className="flex items-center"> {cvName} </span>
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
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={professional} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                posgrado{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={posgrade} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Certificado Bancario{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={certifyBank} width="100px" />
                <span className="flex items-center"> {cvName} </span>
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
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={referencePersonal} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Referencia Academica{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={referenceAcademic} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Referencias Laborales{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={referenceWork} width="100px" />
                <span className="flex items-center"> {cvName} </span>
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
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={verificWork} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Verificación de referencias personales{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={verificPersonal} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
          <article className="md:w-1/3">
            <label className="block">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                {" "}
                Verificación de Referencias Academicas{" "}
              </label>
              <input type="file" className="hidden" onChange={handleChange} />
              <div className="flex cursor-pointer">
                <img src={verificAcademic} width="100px" />
                <span className="flex items-center"> {cvName} </span>
              </div>
            </label>
          </article>
        </div>
      </form>
    </>
  );
};

export default Identification;

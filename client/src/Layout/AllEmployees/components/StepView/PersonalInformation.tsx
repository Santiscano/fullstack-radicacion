import { FC } from "react";
import InputSelect from "../../../../components/common/InputSelect";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import { optionAcademicLevel, optionCivilStatus, optionRH } from "../../../../components/tools/OptionsValuesSelects";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";
import { useAppSelector } from "../../../../redux/hooks/useStore";

const PersonalInformation: FC<{handleNext:()=>void}> = ({handleNext}) => {
  const user = useAppSelector((state) => state.employeesSlice);
  const {
    setResidenceMunicipality,
    setUsersAddress,
    setRh,
    setCivilStatus,
    setGender,
    setAcademicLevel,
    setUsersPhone,
    setUsersCellphone,
    setUsersEmail,
    setEmergencyContactName,
    setEmergencyContactLastname,
    setEmergencyContactRelationship,
    setEmergencyContactPhone,
    setEmergencyContactCellPhone,
    setMedicalEmergency,
    setArlEmergency,
  } = useEmployee();

  return (
    <>
      <form>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Dirección de residencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label={"Dirección Ubicacion"}
              value={user.users_address}
              setValue={setUsersAddress}
              required
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Municipio de residencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label={"Municipio Ubicacion"}
              value={user.residence_municipality}
              setValue={setResidenceMunicipality}
              required
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Telefono
            </label>
            <TextFieldOutlined
              type={"number"}
              label={"numero"}
              value={user.users_phone}
              setValue={setUsersPhone}
              required
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Celular
            </label>
            <TextFieldOutlined
              type={"number"}
              label={"celular"}
              value={user.users_cellphone}
              setValue={setUsersCellphone}
              required
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Correo Electronico
            </label>
            <TextFieldOutlined
              type={"email"}
              label={"Email"}
              value={user.users_email}
              setValue={setUsersEmail}
              required
            />
          </article>
          <article className="md:w-1/2">
            <InputSelect
              label="Genero"
              title="Genero"
              placeholder="Genero"
              required
              value={user.gender}
              onChange={setGender}
              itemDefault="selecciona un estado"
              items={optionCivilStatus}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <InputSelect
              label="RH"
              title="RH"
              placeholder="RH"
              required
              value={user.rh}
              onChange={setRh}
              itemDefault="selecciona un RH"
              items={optionRH}
            />
          </article>
          <article className="md:w-1/2">
            <InputSelect
              label="Estado Civil"
              title="Estado Civil"
              placeholder="Estado Civil"
              required
              value={user.civil_status}
              onChange={setCivilStatus}
              itemDefault="selecciona un estado"
              items={optionCivilStatus}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <InputSelect
              label="Nivel Academico"
              title="Nivel Academico"
              placeholder="Nivel Academico"
              required
              value={user.academic_level}
              onChange={setAcademicLevel}
              itemDefault="selecciona un estado"
              items={optionAcademicLevel}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nombre Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Nombre Contacto"
              value={user.emergency_contact_name}
              setValue={setEmergencyContactName}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Apellidos Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Apellidos Contacto"
              value={user.emergency_contact_lastname}
              setValue={setEmergencyContactLastname}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Relación Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Relación Contacto "
              value={user.emergency_contact_relationship}
              setValue={setEmergencyContactRelationship}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Numero Telefonico Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Numero Telefonico"
              maxLength={7}
              value={user.emergency_contact_phone}
              setValue={setEmergencyContactPhone}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Numero Celular Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Numero Celular"
              maxLength={10}
              value={user.emergency_contact_cell_phone}
              setValue={setEmergencyContactCellPhone}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Emergencia médica
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Emergencia Médica"
              value={user.medical_emergency}
              setValue={setMedicalEmergency}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Emergecia ARL
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Emergencia Arl"
              value={user.arl_emergency}
              setValue={setArlEmergency}
            />
          </article>
        </div>
      </form>
    </>
  );
};

export default PersonalInformation;

import { FC } from "react";
import { Box, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import useNewEmployee from "../../hooks/useNewEmployee";
import InputSelectDocTypeFormData from "../../../../components/common/InputSelectDocTypeFormData";
import InputOutlinedFormData from "../../../../components/common/InputOutlinedFormData";
import InputSelectCediName from "../Inputs/InputSelectCediName";
import InputSelectTypeDocument from "../Inputs/InputSelectTypeDocument";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SociodemographicProfile: FC = () => {
  const { handleSocioDemographicProfile } = useNewEmployee();
  const user = useAppSelector((state) => state.employeesSlice);
  const { setProfilePlaceBirth, setProfileTransportationHelp, setProfileConnectivityHelp, setProfileOthersContractsCompany,
    setProfileWorkingModality, setProfileTitleAcademicTraining, setProfileHomeTenure, setProfileTypeTransport, setProfileHeadFamily,
    setProfileNumberChildren, setProfileDependents, setProfileDependentsDisabilities, setProfileMonthlyFamilyIncome, setProfileIncomeEnough,
    setProfilePublicServicesStratum, setProfileElectricPower, setProfileSewerage, setProfileAqueduct, setProfileNaturalGasNetwork,
    setProfileGarbageColletion, setProfileLandline, setProfileComputerHome, setProfileInternetHome, setProfileAlcoholConsumption,
    setProfileSmoke, setProfileFormerSmoke, setProfilePlaySport, setProfileSportFrequency, setProfileChronicDisease,
    setProfileWhatCrhonicDisease, setProfileTakeMedication, setProfileWhatMedicationTake, setProfileAllergic, setProfileWhatAllergic, } = useEmployee();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
          INFORMACIÓN SOCIODEMOGRAFICA
        </Typography>
      </Box>
      <form onSubmit={handleSocioDemographicProfile}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Lugar De Nacimiento
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Lugar De Nacimiento"
              value={user.profile_place_birth}
              setValue={setProfilePlaceBirth}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ayuda de transporte
            </label>
            <RadioGroup
              row
              name="Ayuda-transporte"
              sx={{marginLeft:"20px"}}
              value={user.profile_transportation_help}
              onChange={setProfileTransportationHelp}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" color="success"/>
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ayuda de conectividad
            </label>
            <RadioGroup
              row
              name="Ayuda-conectividad"
              sx={{marginLeft:"20px"}}
              value={user.profile_connectivity_help}
              onChange={setProfileConnectivityHelp}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Otros contratos de Empresa
            </label>
            <RadioGroup
              row
              name="Ayuda-conectividad"
              sx={{marginLeft:"20px"}}
              value={user.profile_others_contracts_company}
              onChange={setProfileOthersContractsCompany}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Modalidad de trabajo
            </label>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Título Formación Académica
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Tenencia de la vivienda
            </label>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Tipo de transporte
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Cabeza de Hogar
            </label>
            <RadioGroup
              row
              name="Cabeza de Hogar"
              sx={{marginLeft:"20px"}}
              value={user.profile_head_family}
              onChange={setProfileHeadFamily}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Número de niños
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Número de niños"
              value={user.profile_number_children}
              setValue={setProfileNumberChildren}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Dependientes
            </label>
            <RadioGroup
              row
              name="Dependientes"
              sx={{marginLeft:"20px"}}
              value={user.profile_dependents}
              onChange={setProfileDependents}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Discapacidades de dependientes
            </label>
            <RadioGroup
              row
              name="Discapacidades de dependientes"
              sx={{marginLeft:"20px"}}
              value={user.profile_dependents_disabilities}
              onChange={setProfileDependentsDisabilities}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ingresos familiares mensuales
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Ingresos familiares mensuales"
              value={user.profile_monthly_family_income}
              setValue={setProfileMonthlyFamilyIncome}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ingresos suficientes
            </label>
            <RadioGroup
              row
              name="Ingresos suficientes"
              sx={{marginLeft:"20px"}}
              value={user.profile_income_enough}
              onChange={setProfileIncomeEnough}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Estrato de servicios públicos
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Estrato de servicios públicos"
              value={user.profile_public_services_stratum}
              setValue={setProfilePublicServicesStratum}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              energía eléctrica
            </label>
            <RadioGroup
              row
              name="energía eléctrica"
              sx={{marginLeft:"20px"}}
              value={user.profile_electric_power}
              onChange={setProfileElectricPower}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              alcantarillado
            </label>
            <RadioGroup
              row
              name="alcantarillado"
              sx={{marginLeft:"20px"}}
              value={user.profile_sewerage}
              onChange={setProfileSewerage}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Acueducto
            </label>
            <RadioGroup
              row
              name="Acueducto"
              sx={{marginLeft:"20px"}}
              value={user.profile_aqueduct}
              onChange={setProfileAqueduct}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Red de gas natural
            </label>
            <RadioGroup
              row
              name="Red de gas natural"
              sx={{marginLeft:"20px"}}
              value={user.profile_natural_gas_network}
              onChange={setProfileNaturalGasNetwork}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Recolección de basura
            </label>
            <RadioGroup
              row
              name="Recolección de basura"
              sx={{marginLeft:"20px"}}
              value={user.profile_garbage_colletion}
              onChange={setProfileGarbageColletion}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              teléfono fijo
            </label>
            <RadioGroup
              row
              name="teléfono fijo"
              sx={{marginLeft:"20px"}}
              value={user.profile_landline}
              onChange={setProfileLandline}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Computadora en casa
            </label>
            <RadioGroup
              row
              name="Computadora en casa"
              sx={{marginLeft:"20px"}}
              value={user.profile_computer_home}
              onChange={setProfileComputerHome}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Internet en casa
            </label>
            <RadioGroup
              row
              name="Internet en casa"
              sx={{marginLeft:"20px"}}
              value={user.profile_internet_home}
              onChange={setProfileInternetHome}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              consumo de alcohol
            </label>
            <RadioGroup
              row
              name="consumo de alcohol"
              sx={{marginLeft:"20px"}}
              value={user.profile_alcohol_consumption}
              onChange={setProfileAlcoholConsumption}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fuma
            </label>
            <RadioGroup
              row
              name="Fuma"
              sx={{marginLeft:"20px"}}
              value={user.profile_smoke}
              onChange={setProfileSmoke}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ex-Fumador
            </label>
            <RadioGroup
              row
              name="Ex-Fumador"
              sx={{marginLeft:"20px"}}
              value={user.profile_former_smoke}
              onChange={setProfileFormerSmoke}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Practica Deporte
            </label>
            <RadioGroup
              row
              name="Ayuda-conectividad"
              sx={{marginLeft:"20px"}}
              value={user.profile_play_sport}
              onChange={setProfilePlaySport}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Frecuencia con que Practica Deporte
            </label>
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Enfermedades Crónicas
            </label>
            <RadioGroup
              row
              name="Enfermedades Crónicas"
              sx={{marginLeft:"20px"}}
              value={user.profile_chronic_disease}
              onChange={setProfileChronicDisease}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              ¿Qué enfermedad crónica?
            </label>
            <TextFieldOutlined
              type={"text"}
              label="¿Qué enfermedad crónica?"
              value={user.profile_what_crhonic_disease}
              setValue={setProfileWhatCrhonicDisease}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Toma medicamentos
            </label>
            <RadioGroup
              row
              name="Toma medicamentos"
              sx={{marginLeft:"20px"}}
              value={user.profile_take_medication}
              onChange={setProfileTakeMedication}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              ¿Qué medicamentos toma?
            </label>
            <TextFieldOutlined
              type={"text"}
              label="¿Qué medicamentos toma?"
              value={user.profile_what_medication_take}
              setValue={setProfileWhatMedicationTake}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Alérgico
            </label>
            <RadioGroup
              row
              name="Alérgico"
              sx={{marginLeft:"20px"}}
              value={user.profile_allergic}
              onChange={setProfileAllergic}
            >
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
            </RadioGroup>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              ¿A que es Alérgico?
            </label>
            <TextFieldOutlined
              type={"text"}
              label="¿A que es Alérgico?"
              value={user.profile_what_allergic}
              setValue={setProfileWhatAllergic}
            />
          </article>
        </div>
        <button className="button button--flex mt-6">
          Guardar Información Sociodemografica
        </button>
      </form>
    </>
  );
};

export default SociodemographicProfile;

import { FC, useState } from "react"
// date
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//
import useNewEmployee from "../../hooks/useNewEmployee"
import { useAppSelector } from "../../../../redux/hooks/useStore"
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee"
import InputSelect from "../../../../components/common/InputSelect"
import { optionIsActive } from "../../../../components/tools/OptionsValuesSelects"
import InputSelectCediName from "../Inputs/InputSelectCediName"
import InputSelectTypeDocument from "../Inputs/InputSelectTypeDocument"
import TextFieldOutlined from "../../../../components/common/TextFieldOutline"

const General:FC = () => {
  const { handleSubmitEmployee } = useNewEmployee()
  const user = useAppSelector((state) => state.employeesSlice);
  const { setUsersStatus, setUsersIdentification, setUsersName, setUsersLastName,
    setBirthdate, setCity } = useEmployee()

  const [locale, setlocale] = useState("es")
  return (
    <>
      <form onSubmit={handleSubmitEmployee}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <InputSelect
              label="Estado"
              title="Estado"
              placeholder="Estado"
              required
              value={user.users_status}
              onChange={setUsersStatus}
              itemDefault="selecciona Estado"
              items={optionIsActive}
            />
          </article>
          <article className="md:w-1/2">
            <InputSelectCediName
              type={"text"}
              title="Asignar Cedi"
              placeholder="Cedi"
              name="cedi"
              required
              itemDefault="selecciona una opcion"
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
          <InputSelectTypeDocument
              type={"text"}
              title={"Tipo de Documento"}
              placeholder="C.C, NIT..."
              name={"identification_type"}
              required
              itemDefault="Seleccione un Tipo"
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Numero de documento
            </label>
            <TextFieldOutlined
              type={"number"}
              label={"Numero"}
              value={user.users_identification}
              setValue={setUsersIdentification}
              required
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nombre
            </label>
            <TextFieldOutlined
              type={"text"}
              label={"Nombre"}
              value={user.users_name}
              setValue={setUsersName}
              required
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Apellidos
            </label>
            <TextFieldOutlined
              type={"text"}
              label={"Apellidos"}
              value={user.users_lastname}
              setValue={setUsersLastName}
              required
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fecha Nacimiento
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
              <DemoContainer components={['DatePicker']}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderColor: "#2759cd",
                    "&:hover fieldset": {
                      borderColor: "#2759cd",
                    }},
                  width:"100%",
                }}
              >
                <DatePicker
                  value={user.birthdate}
                  // @ts-ignore
                  onChange={setBirthdate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ciudad
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Ciudad"
              value={user.city}
              setValue={setCity}
            />
          </article>
        </div>
      </form>
    </>
  )
}

export default General

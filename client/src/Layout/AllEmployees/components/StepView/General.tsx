import { ChangeEvent, FC, useState } from "react"
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
import InputSelectCediName from "../Inputs/InputSelectCediName"
import InputSelectTypeDocument from "../Inputs/InputSelectTypeDocument"
import TextFieldOutlined from "../../../../components/common/TextFieldOutline"
// test - eliminar despues
import employeeImage from '../../../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png';

const General:FC = () => {
  const { handleSubmitEmployee } = useNewEmployee()
  const user = useAppSelector((state) => state.employeesSlice);
  const { setUsersIdentification, setUsersName, setUsersLastName,
    setBirthdate, setCity, setPhotoPath } = useEmployee()

  const [locale, setlocale] = useState("es");

  const [image, setImage] = useState('');
  const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitEmployee}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fecha Nacimiento
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
              <DemoContainer components={['DatePicker']}
                sx={{
                  "& .MuiFormControl-root": {
                    width:"100%",
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
              Ciudad Nacimiento
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Ciudad"
              value={user.city}
              setValue={setCity}
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
              Foto
            </label>
            <figure className="mt-6 ml-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className ="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600
                "/>
              </div>

            </figure>
          </article>
          <article className="md:w-1/2">
            {image && (
              <img
                src={image}
                alt="imagen empleado"
                className="w-[180px] mt-4 rounded-3xl"
              />
            )}
          </article>
        </div>
      </form>
    </>
  )
}

export default General

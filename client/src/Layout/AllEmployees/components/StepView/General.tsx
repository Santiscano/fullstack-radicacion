import { Box, Button } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
// axios
import axios from "axios";
import allRoutes from "../../../../services/allRoutes";
import { getHeader } from "../../../../components/tools/SesionSettings";
// date
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// components
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import InputSelectTypeDocument from "../Inputs/InputSelectTypeDocument";

const General: FC<{handleNext:()=>void}> = ({handleNext}) => {
  const user = useAppSelector((state) => state.employeesSlice);
  const {
    setUsersIdentification,
    setUsersName,
    setUsersLastName,
    setBirthdate,
    setCity,
    setPhotoPath,
  } = useEmployee();

  const locale = "es";

  const [image, setImage] = useState("");
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEmployee = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(user.birthdate !== ''){
      // entregar la imagen al boquet
      // entregar datos a la DB
      await axios.post(allRoutes.sig.humanManagement.employees.createEmployee, {
        employees_name: user.users_name,
        employees_lastname: user.users_lastname,
        employees_identification_type: user.users_identification_type,
        employees_identification: user.users_identification,
        employees_rh: "",
        employees_birthdate_date: user.birthdate,
        employees_birthdate_city: user.city,
        employees_photo_path:"https://static.vecteezy.com/system/resources/thumbnails/009/397/835/small/man-avatar-clipart-illustration-free-png.png",
      }, getHeader())
      handleNext()
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitEmployee}>
        {/* butons next - prev */}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled
            sx={{ mr: 1 }}
          >
            Atrás
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button variant="contained" type="submit">
            Contratación
          </Button>
        </Box>
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
              Fecha Nacimiento
            </label>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={locale}
            >
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  "& .MuiFormControl-root": {
                    width: "100%",
                    borderColor: "#2759cd",
                    "&:hover fieldset": {
                      borderColor: "#2759cd",
                    },
                  },
                  width: "100%",
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
                  id="upload-file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  placeholder="seleccione"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
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
  );
};

export default General;

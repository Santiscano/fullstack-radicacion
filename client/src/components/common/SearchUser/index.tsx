// @ts-nocheck
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Route from "../../../services/Routes";
import { getHeader } from "../../tools/SesionSettings";

const AutocompleteStyled = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function LocationsSelect({
  labelDepartment,
  labelCity,
  city,
  setCity,
  department,
  setDepartment,
  handleValuesUser,
  requiredCity,
  requiredDepartment,
  readOnlyCity,
  readOnlyDepartment,
  disabledCity,
  disabledDepartment,
}: any) {
  const [departments, setDepartments] = useState([]);
  // const documents = ["CEDULA CIUDADANIA", "NIT", "CEDULA EXTRANGERIA"];
  const [cities, setCities] = useState([]);
  const [disabledCityAction, setDisabledCityAction] = useState(false);

  const handleReadDepartments = () => {
    axios
      .post(Route.api.users.getTypeIdentification, {
        api_key: import.meta.env.VITE_API_KEY,
      })
      .then((res) => {
        // console.log(res.data.data);
        setDepartments(res.data.data);
      });
  };

  const handleReadCities = (users_identification: any) => {
    axios
      .post(Route.api.users.getDocumentTypes, {
        api_key: import.meta.env.VITE_API_KEY,
        users_identification_type: users_identification,
      })
      .then((res) => {
        console.log(res.data.data);
        setCities(res.data.data);
      });
  };

  /**
   * parametros que recibe el autocomplete para renderizar las opciones
   * @option : selecciona el array de opciones a usar
   * @getOptionLabel : mostrara el valor seleccionado
   * @renderOption : cambia el renderizado del objeto option a como lo seleccione personalizado
   */
  const List = ({
    type,
    value,
    setValue,
    options,
    itemID,
    label,
    disabled,
    readOnly,
    required,
  }: any) => {
    return (
      <>
        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
          {label}
        </label>
        <AutocompleteStyled
          sx={{ marginLeft: 1, my: 2, width: 0.98 }}
          disablePortal
          filterSelectedOptions
          disableClearable
          disabled={disabled}
          readOnly={readOnly}
          id="filter-providers"
          options={options}
          getOptionLabel={(option) => option}
          getOptionDisabled={(option) => option === value}
          isOptionEqualToValue={(option, value) => option === value}
          itemID={itemID}
          value={value}
          onChange={(event, newValue) => {
            if (![null, ""].includes(newValue)) {
              setValue(newValue);

              if (type === "departments") {
                setDisabledCityAction(false);
                setCity("");
                handleReadCities(newValue.split("-").shift().trim());
              }
            } else {
              if (type === "cities") {
                setDisabledCityAction(false);
              }
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // label={!label ? "Lista Proveedores" : label}
              variant={"outlined"}
              color={"primary"}
              required={required}
              InputProps={{
                ...params.InputProps,
                autoComplete: "off",
              }}
            />
          )}
        />
      </>
    );
  };

  useEffect(() => {
    if ([null, ""].includes(department)) {
      setDisabledCityAction(true);
    }

    if (![null, ""].includes(department)) {
      handleReadCities(department);
    }

    handleReadDepartments();
  }, []);

  return (
    <div className="md:flex md:flex-wrap">
      <article className="md:w-1/2">
        <List
          type={"departments"}
          label={!labelDepartment ? "Tipo Documento" : labelDepartment}
          value={department}
          setValue={setDepartment}
          required={requiredDepartment}
          disabled={disabledDepartment}
          readOnly={readOnlyDepartment}
          // @ts-ignore
          options={departments.map((type) => type.typeDocument)}
        />
      </article>

      <article className="md:w-1/2">
        <List
          type={"cities"}
          label={!labelCity ? "Numero Documento" : labelCity}
          value={city}
          setValue={setCity}
          required={requiredCity}
          disabled={disabledCityAction}
          readOnly={readOnlyCity}
          options={cities.map(
            (user) =>
              // @ts-ignore
              `${user.users_identification}-${user.users_identification_digital_check}-${user.users_name} ${user.users_lastname}`
          )}
          renderOption={(props, option, index) => (
            <Box component="li" {...props} key={index}>
              {option.users_identification}-
              {option.users_identification_digital_check}/ {option.users_name}{" "}
              {option.users_lastname}
            </Box>
          )}
        />
      </article>
    </div>
  );
}

export default LocationsSelect;

// @ts-nocheck
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Route from "../../../services/allRoutes";
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
  const [documentType, setDocumentType] = useState([]);
  const [documentNumber, setDocumentNumber] = useState([]);
  const [disabledCityAction, setDisabledCityAction] = useState(true);

  const handleTypeIdentification = () => {
    axios
      .get(Route.api.users.getTypeIdentification, getHeader())
      .then((res) => {
        console.log("searchUser: ", res.data.data);
        setDocumentType(res.data.data);
      });
  };

  const handleDocumentNumber = (users_identification_type: any) => {
    axios
      .post(
        Route.api.users.getDocumentTypes,
        {
          users_identification_type,
        },
        getHeader()
      )
      .then((res) => {
        console.log("users_identification_type: ", users_identification_type);
        console.log("providers: ", res.data.data);
        setDocumentNumber(res.data.data);
        setDisabledCityAction(false);
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

              if (type === "documentType") {
                console.log("newValue: ", newValue);
                setDisabledCityAction(true);
                setCity("");
                handleDocumentNumber(newValue.split("-").shift().trim());
              }
            } else {
              if (type === "documentNumber") {
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
      setDisabledCityAction(false);
    }

    if (![null, ""].includes(department)) {
      console.log("tipo documento: ", department);
      handleDocumentNumber(department);
    }

    handleTypeIdentification();
  }, []);

  // useEffect(() => {
  //   console.log("cambio en documentType");
  //   handleDocumentNumber();
  // }, [department]);

  return (
    <div className="md:flex md:flex-wrap">
      <article className="md:w-1/2">
        <List
          type={"documentType"}
          label={
            !labelDepartment ? "Tipo Documento Proveedor" : labelDepartment
          }
          value={department}
          setValue={setDepartment}
          required={requiredDepartment}
          disabled={disabledDepartment}
          readOnly={readOnlyDepartment}
          // @ts-ignore
          options={documentType.map((type) => type.typeDocument)}
        />
      </article>

      <article className="md:w-1/2">
        <List
          type={"documentNumber"}
          label={!labelCity ? "Número Documento Proveedor" : labelCity}
          value={city}
          setValue={setCity}
          required={requiredCity}
          disabled={disabledCityAction}
          readOnly={readOnlyCity}
          options={documentNumber.map(
            (user) =>
              // @ts-ignore
              `${user.users_identification}-${user.users_identification_digital_check}-${user.users_name} ${user.users_lastname}`
          )}
          renderOption={(props, option, index) => (
            <Box component="li" {...props} key={index}>
              {option.users_identification}-
              {option.users_identification_digital_check}/ {option.users_name}{" "}
              {option.users_lastname && option.users_lastname}
            </Box>
          )}
        />
      </article>
    </div>
  );
}

export default LocationsSelect;

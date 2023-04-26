// @ts-nocheck
import { Autocomplete, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Route from "../../../../../services/Routes";

const AutocompleteStyled = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function BusinessUnitCedi({
  labelDepartment,
  labelCity,
  city,
  setCity,
  operation,
  setDepartment,
  handleValuesUser,
  requiredCity,
  requiredDepartment,
  readOnlyCity,
  readOnlyDepartment,
  disabledCity,
  disabledDepartment,
}: any) {
  const [businessUnit, setBusinessUnit] = useState([]);
  // const documents = ["CEDULA CIUDADANIA", "NIT", "CEDULA EXTRANGERIA"];
  const [cedi, setCedi] = useState([]);
  const [disabledCediAction, setDisabledCediAction] = useState(false);

  const handleBusinessUnit = (id: any) => {
    axios
      .post(
        Routes.api.centerCost.area.getCostArea,
        {
          api_key: import.meta.env.VITE_API_KEY,
        },
        getHeader()
      )
      .then((res) => {
        // console.log(res.data.data);
        setBusinessUnit(res?.data.data);
      });
  };

  const handleDocumentNumber = (idcost_center_area: any) => {
    axios
      .post(
        Route.api.centerCost.subArea.getCostSubAreaById,
        {
          api_key: import.meta.env.VITE_API_KEY,
          idcost_center_area,
        },
        getHeader()
      )
      .then((res) => {
        // console.log(res.data.data);
        setCedi(res.data.data);
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
                setDisabledCediAction(false);
                setCity("");
                handleDocumentNumber(newValue.split("-").shift().trim());
              }
            } else {
              if (type === "documentNumber") {
                setDisabledCediAction(false);
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
    if ([null, ""].includes(operaction)) {
      setDisabledCediAction(true);
    }

    if (![null, ""].includes(operation)) {
      handleDocumentNumber(operation);
    }

    handleBusinessUnit();
  }, []);

  return (
    <div className="md:flex md:flex-wrap">
      <article className="md:w-1/2">
        <List
          type={"documentType"}
          label={!labelDepartment ? "Tipo Documento" : labelDepartment}
          value={operation}
          setValue={setDepartment}
          required={requiredDepartment}
          disabled={disabledDepartment}
          readOnly={readOnlyDepartment}
          // @ts-ignore
          options={businessUnit.map((type) => type.typeDocument)}
        />
      </article>

      <article className="md:w-1/2">
        <List
          type={"documentNumber"}
          label={!labelCity ? "Numero Documento" : labelCity}
          value={city}
          setValue={setCity}
          required={requiredCity}
          disabled={disabledCediAction}
          readOnly={readOnlyCity}
          options={cedi.map(
            (user) =>
              // @ts-ignore
              `${user.users_identification}-${user.users_identification_digital_check}-${user.users_name} ${user.users_lastname}`
          )}
          renderOption={(props, option, index) => (
            <Box component="li" {...props} key={index}>
              {option.users_identification}-
              {option.users_identification_digital_check}/ {option.users_name}{" "}
              {option.users_lastname ? option.users_lastname : ""}
            </Box>
          )}
        />
      </article>
    </div>
  );
}

export default BusinessUnitCedi;

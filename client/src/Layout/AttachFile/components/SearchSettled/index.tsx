import { Autocomplete, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { GetAllSettled } from "../../../../services/SearchFile.routes";
import { remove } from "../../../../components/tools/SesionSettings";

const AutocompleteStyled = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function SearchSettled({
  value,
  setValue,
  required,
  disabled,
  readOnly,
  selected = [],
  label,
}: any) {
  const [listSettleds, setListSettleds] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const getAllRegisteredFiles = async () => {
    try {
      const resSettleds = await GetAllSettled();
      if(resSettleds.status == 200){
        console.log("Settleds: ", resSettleds?.data.data);
        const elements = resSettleds?.data.data;
        const rows = [];
        selected.map((file: any) => {
          if (![undefined, false, null, ""].includes(elements[file])) {
            rows.push(...elements[file]);
          }
        });
        setListSettleds(elements);
        setLoading(false);
      }
    } catch (err) {
      // @ts-ignore
      console.log("error ejecutado",err.response.data.message);
      // @ts-ignore
      const message = err.response.data.message;
      if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
        remove("accessToken");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getAllRegisteredFiles();
  }, []);

  return (
    <>
      <AutocompleteStyled
        disablePortal
        filterSelectedOptions
        disabled={disabled}
        readOnly={readOnly}
        options={listSettleds.map((file: any) => file.files_registered)}
        // @ts-ignore
        getOptionLabel={(file) => `${file}`}
        getOptionDisabled={(file) => file === value}
        itemID={"idFile"}
        value={
          loading || !value || !listSettleds.some((option:any) => option.files_registered === value ) //validacion adicional
          ? null
          : value
        }
        onChange={(event, newValue) => setValue(newValue)}
        isOptionEqualToValue={(option:any, value:any) => option.files_registered === value} //funcion de comparacion personalizada
        renderInput={(params) => (
          <TextField
            {...params}
            label={!label ? "Radicado" : label}
            // color={"blue"}
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
}

export default SearchSettled;

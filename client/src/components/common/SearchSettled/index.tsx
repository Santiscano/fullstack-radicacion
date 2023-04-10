import { Autocomplete, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";
import { GetAllSettled } from "../../../services/SearchFile.routes";

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

  const getAllRegisteredFiles = async () => {
    try {
      const resSettleds = await GetAllSettled();
      console.log("Settleds: ", resSettleds?.data.data);
      const elements = resSettleds?.data.data;
      const rows = [];
      selected.map((file: any) => {
        if (![undefined, false, null, ""].includes(elements[file])) {
          rows.push(...elements[file]);
        }
      });
      setListSettleds(elements);
    } catch (error) {
      console.log("error: ", error);
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
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        // @ts-ignore
        // renderOption={(props, option, index) => (
        //   <Box component="li" {...props}>
        //     {/* todas las opciones son iguales a vista */}
        //     {`${option}-numero`}
        //     {/* {option} */}
        //   </Box>
        // )}
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

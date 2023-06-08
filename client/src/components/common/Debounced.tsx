import { Menu, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, FC, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import allRoutes from "../../services/allRoutes";
import { getHeader } from "../tools/SesionSettings";
import useCatch from "../../hooks/useCatch";
import { useEmployee } from "../../redux/Redux-actions/useEmployee";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
type Props = {
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: any;
  setValue?: (e: any) => void;
  event?: any;
  iconStart?: any;
  iconEnd?: any;
  defaultValue?: any;
};
type TypeOptionEmployee = {
  idroles: number;
  idsedes: number;
  idusers: number;
  users_address: string;
  users_email: string;
  users_identification: string;
  users_identification_digital_check: string;
  users_identification_type: string;
  users_lastname: string;
  users_name: string;
  users_phone: string;
  users_providers_expiration_date: string;
  users_providers_paydays: number;
  users_status: string;
};

const Debounced: FC<Props> = ({
  label,
  value,
  setValue,
  required,
  disabled,
  event,
  readOnly,
  iconStart,
  iconEnd,
  defaultValue,
  name,
}) => {
  const { handleCatch } = useCatch();
  const { addEmployee } = useEmployee();
  // DEBOUNCE
  const [search, setSearch] = useState<string>("");
  const [optionsResult, setOptionsResult] = useState<TypeOptionEmployee[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  // anchorEl
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSubmitDebounced = (employee: string) => {
    axios
      .post(
        allRoutes.sig.humanManagement.getDebouncedEmployee,
        {
          employee,
        },
        getHeader()
      )
      .then((res) => {
        setOptionsResult(res.data.data);
        console.log("res", res);
      })
      .catch((err) => {
        // handleCatch(err);
        console.log(err);
      });
  };

  // Methods DEBOUNCE
  const handleDebounced = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e: ", e);
    setSearch(e.target.value);
  };
  // anchorEl
  const handleClose = () => {
    console.log("debe cerrar el menu");
    setAnchorEl(null);
  };

  const setEmployeeSelected = (option:TypeOptionEmployee) => {
    handleClose();
    setSearch(`${option.users_name} ${option.users_lastname}`);
    console.log('capturado', option);
    addEmployee(option)
  };

  useEffect(() => {
    // Aquí puedes realizar la consulta a la base de datos con el valor debounced (debouncedSearch)
    handleSubmitDebounced(search);
    console.log("Consultando la base de datos:", debouncedSearch);
    if (debouncedSearch) {
      console.log("anchor entro", debouncedSearch);
      setAnchorEl(document.getElementById("custom-css-outlined-input"));
    } else {
      handleClose();
    }
  }, [debouncedSearch]);

  return (
    <>
      <CssTextField
        sx={{ m: 1, width: 0.98 }}
        id="custom-css-outlined-input"
        fullWidth
        type={"text"}
        name={name}
        required={required}
        disabled={disabled}
        label={label}
        value={search}
        onChange={handleDebounced}
        variant={"outlined"}
        color={"primary"}
        autoComplete={"off"}
        InputProps={{
          readOnly: readOnly,
          startAdornment: iconStart ? (
            <InputAdornment position="start"> {iconStart} </InputAdornment>
          ) : null,
          endAdornment: iconEnd ? (
            <InputAdornment position="end"> {iconEnd} </InputAdornment>
          ) : null,
        }}
      />
      {search !== "" && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {optionsResult.map((option) => (
            <MenuItem key={option.idusers} onClick={() => setEmployeeSelected(option)}>
              {`${option.users_name} ${option.users_lastname} - ${option.users_identification_type}`}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default Debounced;

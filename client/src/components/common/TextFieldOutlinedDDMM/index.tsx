import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function TextFieldOutlined({
  label,
  type,
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
  maxLength,
}: any) {
  let inputProps = {};
  if (type === "number") {
    inputProps = {
      min: 0,
      max: 99,
    };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Eliminar todos los caracteres que no sean dígitos o letras
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");

    // Separar los caracteres en grupos de 2 con un slash (/) entre ellos
    const formattedValue = sanitizedValue.replace(/(.{2})/g, "$1/");

    // Eliminar el slash adicional al final si existe
    const finalValue = formattedValue.replace(/\/$/, "");

    setValue(finalValue);
    event && event(e);
  };

  return (
    <CssTextField
      sx={{ m: 1, width: 0.98 }}
      id="custom-css-outlined-input"
      fullWidth
      type={type}
      name={name}
      required={required}
      disabled={disabled}
      label={label}
      value={value}
      onChange={handleInputChange}
      variant={"outlined"}
      color={"primary"}
      autoComplete={"off"}
      inputProps={{ maxLength: 4 }}
      InputProps={{
        inputProps: {
          maxLength: maxLength,
        },
        readOnly: readOnly,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
}

export default TextFieldOutlined;

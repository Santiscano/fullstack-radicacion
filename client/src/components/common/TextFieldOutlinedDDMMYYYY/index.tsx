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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Eliminar todos los caracteres que no sean dígitos
    const sanitizedValue = inputValue.replace(/\D/g, "");

    // Crear variables para almacenar los grupos de dígitos
    let day = sanitizedValue.substring(0, 2);
    let month = sanitizedValue.substring(2, 4);
    let year = sanitizedValue.substring(4, 8);

    // Formatear la fecha con barras diagonales (/)
    const formattedValue = `${day}${day.length === 2 ? "/" : ""}${month}${
      month.length === 2 ? "/" : ""
    }${year}`;

    setValue(formattedValue);
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
      inputProps={{ maxLength: 10 }} // Establecer la longitud máxima a 10 caracteres
      InputProps={{
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

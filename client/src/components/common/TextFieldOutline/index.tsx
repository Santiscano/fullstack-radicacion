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
}: any) {
  let inputProps = {};
  if (type == "number") {
    inputProps = {
      min: 0,
      max: 99,
    };
  }
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
      onChange={(e) => {
        setValue(e.target.value);
        event && event(e);
      }}
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
  );
}

export default TextFieldOutlined;

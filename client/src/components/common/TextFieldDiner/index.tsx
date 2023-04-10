import { TextField } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import InputAdornment from "@mui/material/InputAdornment";


const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

// function formatNumber(e:any) {
//   let value = e.target.value;
//   value = new Intl.NumberFormat('en-US', {
//     style: 'currency', currency: 'USD'
//   }).format(value);
//   return value;
// };
// function formatNumber (number:any) {
//   return number.toLocaleString("en", {
//     style: "currency",
//     currency: "EUR"
//   });
// }
// function formatNumber(e:any){
//   let value = e.target.value;
//   value =  value.replace(/\D/g, "")
//                 .replace(/([0-9])([0-9]{2})$/, '$1.$2')
//                 .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
//   return value
// }

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
}:any) {
  const numericAmount = parseFloat(value);
  const formattedAmount = numericAmount.toLocaleString('es-CO',{
    style: 'currency',
    currency: 'COP',
  });
  return (
    <CssTextField
      id="custom-css-outlined-input"
      fullWidth
      type="number"
      name={name}
      required={required}
      disabled={disabled}
      label={label}
      value={formattedAmount}
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
      sx={{ m: 1, width: 0.98 }}
    />
  );
}

export default TextFieldOutlined;

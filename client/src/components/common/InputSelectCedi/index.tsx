import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import Routes from "../../../services/Routes";
import { getHeader } from "../../tools/SesionSettings";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
export default function index(props: any) {
  const [cedis, setCedis] = useState([]);

  const handleGetCedis = async () => {
    try {
      const getCedis = await axios.post(
        Routes.api.cedis.get,
        { api_key: import.meta.env.VITE_API_KEY },
        getHeader()
      );
      // console.log("res:", getCedis.data);
      setCedis(getCedis.data);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    handleGetCedis();
  }, []);

  return (
    <>
      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
        {props.title}
      </label>
      <Selecting sx={{ m: 1, width: 0.98 }}>
        <InputLabel id={`${props.placeholder}-label`}>
          {props.placeholder}
        </InputLabel>
        <Select
          key={props.index}
          label={props.placeholder}
          labelId={`${props.placeholder}-label`}
          id={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          autoWidth
          required={props.required}
          disabled={props.disabled}
          autoComplete={"off" || props.autoComplete}
          name={props.name}
        >
          <MenuItem value="">
            <em>{props.itemDefault}</em>
          </MenuItem>

          {cedis.map((item: any, index: any) => (
            <MenuItem key={index} value={item} sx={{ m: 1, minWidth: 300 }}>
              {item.sedes_city}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </>
  );
}

import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import Routes from "../../../services/allRoutes";
import { getHeader, remove } from "../../tools/SesionSettings";
import { useNavigate } from "react-router-dom";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
export default function index(props: any) {
  const [cedis, setCedis] = useState([]);
  const navigate = useNavigate()

  const handleGetCedis = async () => {
    try {
      const getCedis = await axios.get(Routes.api.cedis.get, getHeader());
      const allCedis = getCedis.data.data;
      console.log('allCedis: ', allCedis);
      setCedis(allCedis);
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
              {item.sedes_city} - {item.sedes_name}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </>
  );
}

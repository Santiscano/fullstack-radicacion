import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";
import allRoutes from "../../../../../services/allRoutes";
import { getHeader, remove } from "../../../../../components/tools/SesionSettings";
import { useAppSelector } from "../../../../../redux/hooks/useStore";
import { useModalUserView } from "../../../../../redux/Redux-actions/useModalUserView";
import { useNavigate } from "react-router-dom";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

export default function InputEditCedi(props:any) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { setSedesName } = useModalUserView();
  const [cedis, setCedis] = useState([]);
  const [value, setValue] = useState('');

  const handleGetCedis = async () => {
    try {
      const getCedis = await axios.get(allRoutes.api.cedis.cedisName, getHeader());
      const allCedis = getCedis.data.data;
      const sedesName = allCedis.map((row: any) => row.sedes_name)
      console.log('allCedis input: ', sedesName);
      setCedis(sedesName);
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


  const handleCedi = (e: SelectChangeEvent) => {
    // @ts-ignore
    setValue(e.target.value);
    console.log('handlecedi ejecutado', e.target.value);
    setSedesName(e.target.value);
  };

  useEffect(() => {
    handleGetCedis();
    console.log(user)
    setValue(user.sedes_name);
  }, []);

  return (
    <>
      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
        {props.title} - valor actual: {value}
      </label>
      <Selecting sx={{m:1, width: 0.98}}>
        <InputLabel id={`${props.placeholder}-label`}>
          {props.placeholder}
        </InputLabel>
        <Select
          key={props.index}
          label={props.placeholder}
          labelId={`${props.placeholder}-label`}
          id={props.placeholder}
          // @ts-ignore
          value={value}
          onChange={handleCedi}
          autoWidth
          required={props.required}
          disabled={props.disabled}
          autoComplete={"off" || props.autoComplete}
          name={props.name}
        >
          <MenuItem value="">
            <em>seleccione el nuevo valor</em>
          </MenuItem>

          {cedis.map((item: any, index: any) => (
            <MenuItem key={index} value={item} sx={{ m: 1, minWidth: 300 }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </>
  )
};

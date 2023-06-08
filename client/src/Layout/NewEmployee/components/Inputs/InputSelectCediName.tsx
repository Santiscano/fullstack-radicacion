import { FC, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";
import { getHeader, remove } from "../../../../components/tools/SesionSettings";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import allRoutes from "../../../../services/allRoutes";


const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

type Sedes = {
  sedes_name: string
};
type Props = {
  type: string;
  title:string;
  placeholder:string;
  name:string;
  itemDefault?:string;
  required?:boolean;
  disabled?:boolean;
  index?: number | string;
  autoComplete?: string | undefined;
}

const InputSelectCediName:FC<Props> = (props) => {
  const navigate = useNavigate();
  const { handleMessageSnackbar } = useContextProvider();
  const user = useAppSelector((state) => state.employeesSlice);
  const { setSedesName } = useEmployee();

  const [cediName, setCediName] = useState<string[]>([]);
  const [value, setvalue] = useState<string | undefined>('');

  const handleGetCedis = async () => {
    try{
      const getCedis = await axios.get(allRoutes.api.cedis.cedisName, getHeader())
      const allCedis = getCedis.data.data;
      const sedesName = allCedis.map((row: Sedes) => row.sedes_name)
      console.log('allCedis input: ', sedesName);
      setCediName(sedesName);
    }catch(err){
      // @ts-ignore
      const message = err.response.data.message;
      console.log("error ejecutado", message);
      handleMessageSnackbar("error", message);
      if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
        remove("accessToken");
        navigate("/login");
      }
    }
  };

  const handleCedi = (e:SelectChangeEvent) => {
    const sedes_name = e.target.value;
    console.log(sedes_name);
    setvalue(sedes_name);
    setSedesName(sedes_name);
  };

  useEffect(() => {
    handleGetCedis();
    setvalue(user.sedes_name);
    // console.log('user.sedes_name: ', user.sedes_name);
  },[])


  return (
    <>
      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
        {props.title}
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

          {cediName.map((item: any, index: any) => (
            <MenuItem key={index} value={item} sx={{ m: 1, minWidth: 300 }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </>
  )
}

export default InputSelectCediName

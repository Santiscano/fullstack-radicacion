import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";
import allRoutes from "../../../../../services/allRoutes";
import { getHeader } from "../../../../../components/tools/SesionSettings";
import { useAppSelector } from "../../../../../redux/hooks/useStore";
import { useModalUserView } from "../../../../../redux/Redux-actions/useModalUserView";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

export default function InputEditCedi(props:any) {
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { setEditSedes } = useModalUserView();
  const [cedis, setCedis] = useState([]);
  const [value, setValue] = useState({
    idsedes: user.idsedes,
    sedes_address: user.sedes_address,
    sedes_city: user.sedes_city,
    sedes_country: user.sedes_country,
    sedes_name: user.sedes_name,
    sedes_state: user.sedes_state,
    sedes_type: user.sedes_type,
  });

  const handleGetCedis = async () => {
    try {
      const getCedis = await axios.get(allRoutes.api.cedis.get, getHeader());
      const allCedis = getCedis.data.data;
      console.log('allCedis: ', allCedis);
      setCedis(allCedis);
    } catch (e) {
      console.log(e);
    }
  };


  const handleCedi = (e: SelectChangeEvent) => {
    // @ts-ignore
    setValue(e.target.value);
    console.log('handlecedi ejecutado', e.target.value);
    setEditSedes(value.idsedes, value.sedes_address, value.sedes_city, value.sedes_country, value.sedes_name, value.sedes_state, value.sedes_type);
  };

  useEffect(() => {
    handleGetCedis();
    console.log(user)
    // @ts-ignore
    setValue({
      idsedes: user.idsedes,
      sedes_address: user.sedes_address,
      sedes_city: user.sedes_city,
      sedes_country: user.sedes_country,
      sedes_name: user.sedes_name,
      sedes_state: user.sedes_state,
      sedes_type: user.sedes_type,
    })
  }, []);

  return (
    <>
      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
        {props.title} - valor actual: {value.sedes_name}
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
            <MenuItem key={index} value={item.idsedes} sx={{ m: 1, minWidth: 300 }}>
              {item.sedes_city} - {item.sedes_name}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </>
  )
};

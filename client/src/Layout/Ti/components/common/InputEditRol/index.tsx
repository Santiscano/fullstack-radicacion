import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getHeader, remove } from "../../../../../components/tools/SesionSettings";
import { useModalUserView } from "../../../../../redux/Redux-actions/useModalUserView";
import { useAppSelector } from "../../../../../redux/hooks/useStore";
import allRoutes from "../../../../../services/allRoutes";
import axios from "axios";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

type Roles = {
  roles: string
};

export default function InputEditRol(props:any) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { setRolesName } = useModalUserView();
  const [roles, setRoles] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const handleGetRoles = async () => {
    try{
      const getRolesName = await axios.get(allRoutes.api.roles.getName, getHeader());
      const allRoles = getRolesName.data.data;
      const rolesName = allRoles.map((row: Roles) => row.roles)
      setRoles(rolesName);
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

  const handleRol = (e:SelectChangeEvent) => {
    // @ts-ignore
    setValue(e.target.value);
    console.log('handle Rol', e.target.value);
    setRolesName(e.target.value);
  };

  useEffect(() => {
    handleGetRoles();
    setValue(user.roles);
    console.log('useEffect inputEditRol',user);
  },[]);

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
          value={value}
          onChange={handleRol}
          autoWidth
          required={props.required}
          disabled={props.disabled}
          autoComplete={"off" || props.autoComplete}
          name={props.name}
        >
          <MenuItem value="">
            <em>{props.itemDefault}</em>
          </MenuItem>

          {roles.map((item: any, index: any) => (
            <MenuItem
              key={index}
              value={item}
              sx={{ m: 1, minWidth: 300 }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </>
  )

}

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Route from "../../../../../services/allRoutes";
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
export default function InputEditDocumentType(props: any) {
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { setidentificationType } = useModalUserView();
  const [documentType, setDocumentType] = useState([]);
  const [value, setValue] = useState(user.users_identification_type);
  const navigate = useNavigate();

  const handleReadDocumentType = () => {
    axios
      .get(Route.api.users.getTypeIdentification, getHeader())
      .then((res) => {
        // console.log(res.data.data);
        setDocumentType(res.data.data);
      })
      .catch ((err) => {
        // @ts-ignore
        console.log("error ejecutado",err.response.data.message);
        // @ts-ignore
        const message = err.response.data.message;
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
      })
  };

  const handleDocumentType = (e: SelectChangeEvent) => {
    setValue(e.target.value);
    setidentificationType(e.target.value)
  };

  useEffect(() => {
    handleReadDocumentType();
  }, []);

  return (
    <div>
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
          onChange={handleDocumentType}
          autoWidth
          required={props.required}
          disabled={props.disabled}
          autoComplete={"off" || props.autoComplete}
          name={props.name}
        >
          <MenuItem value="">
            <em>{props.itemDefault}</em>
          </MenuItem>

          {documentType.map((item: any, index: any) => (
            <MenuItem
              key={index}
              value={item.typeDocument}
              sx={{ m: 1, minWidth: 300 }}
            >
              {item.typeDocument}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </div>
  );
}

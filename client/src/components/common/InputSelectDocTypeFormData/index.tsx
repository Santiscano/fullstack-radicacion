import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Route from "../../../services/allRoutes";
import { getHeader, remove } from "../../tools/SesionSettings";
import { useNavigate } from "react-router-dom";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
export default function InputSelectDocTypeFormData(props: any) {
  const [documentType, setDocumentType] = useState([]);
  const navigate = useNavigate();

  const handleReadDocumentType = () => {
    axios
      .get(Route.api.users.getTypeIdentification, getHeader())
      .then((res) => {
        console.log(res.data.data);
        const listTypes = res.data.data.map((item:any) =>item.typeDocument )
        setDocumentType(listTypes);
        console.log('listTypes: ', listTypes);
      })
      .catch((err) => {
        // @ts-ignore
        const message = err.response.data.message
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
      })
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
              value={item}
              sx={{ m: 1, minWidth: 300 }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </Selecting>
    </div>
  );
}

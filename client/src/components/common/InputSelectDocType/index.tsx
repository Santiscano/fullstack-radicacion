import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Route from "../../../services/Routes";
import { getHeader } from "../../tools/SesionSettings";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
export default function InputSelect(props: any) {
  const [documentType, setDocumentType] = useState([]);

  const handleReadDocumentType = () => {
    axios
      .post(Route.api.users.getTypeIdentification, {
        api_key: import.meta.env.VITE_API_KEY,
      })
      .then((res) => {
        console.log(res.data.data);
        setDocumentType(res.data.data);
      });
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

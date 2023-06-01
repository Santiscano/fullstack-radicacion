import { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import { getSubAreaById } from "../../../../../services/CenterCost.routes";

import axios from "axios";
import Route from "../../../../../services/allRoutes";
import { getHeader, remove } from "../../../../../components/tools/SesionSettings";
import useContextProvider, { GeneralValuesContext } from "../../../../../Context/GeneralValuesContext";
import { useNavigate } from "react-router-dom";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function GetCediToBusinessUnit({ BusinessUnit }: any) {
  const { cediConection, setCediConection } = useContextProvider();
  // const [cedi, setCedi] = useState<any>();
  const [listCedis, setListCedis] = useState([]);
  const navigate = useNavigate();

  const handleDocumentNumber = (idcost_center_area: any) => {
    axios
      .post(
        Route.api.centerCost.subArea.getCostSubAreaById,
        {
          api_key: import.meta.env.VITE_API_KEY,
          idcost_center_area,
        },
        getHeader()
      )
      .then((res) => {
        console.log("getcideByid", res.data.data);
        setListCedis(res.data.data);
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

  useEffect(() => {
    setCediConection("");
    handleDocumentNumber(BusinessUnit);
  }, [BusinessUnit]);

  return (
    <article className="md:w-full">
      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
        Cedi a Conectar
      </label>
      <Selecting sx={{ m: 1, width: 0.98 }}>
        <InputLabel id={`Selecciona Una Cedi A Conectar-label`}>
          {"Selecciona Una Cedi A Conectar"}
        </InputLabel>
        <Select
          label="Selecciona Una Cedi A Conectar"
          labelId="Selecciona Una Cedi A Conectar-label"
          id="Seleccionar"
          value={cediConection}
          onChange={(e, newValue) => {
            setCediConection(e.target.value);
          }}
          autoWidth
          disabled={!BusinessUnit}
          autoComplete={"off"}
          name={"cedi"}
        >
          <MenuItem value="">
            <em>{"Seleccione una cedi"}</em>
          </MenuItem>
          {Array.isArray(listCedis) &&
            listCedis.map((item: any, index: any) => (
              <MenuItem key={index} value={item}>
                {item.number} - {item.name}
              </MenuItem>
            ))}
        </Select>
      </Selecting>
    </article>
  );
}

export default GetCediToBusinessUnit;

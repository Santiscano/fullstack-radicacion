import { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import { getSubAreaById } from "../../../../../services/CenterCost.routes";

import axios from "axios";
import Route from "../../../../../services/Routes";
import { getHeader } from "../../../../../components/tools/SesionSettings";
import { GeneralValuesContext } from "../../../../../Context/GeneralValuesContext";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function GetCediToDependenci({ BusinessUnit }: any) {
  const { cediConection, setCediConection } = useContext(GeneralValuesContext);
  // const [cedi, setCedi] = useState<any>();
  const [listCedis, setListCedis] = useState([]);

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
      });
  };

  useEffect(() => {
    setCediConection("");
    handleDocumentNumber(BusinessUnit);
  }, [BusinessUnit]);

  return (
    <article className="md:w-full">
      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
        Numero de Documento
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

export default GetCediToDependenci;

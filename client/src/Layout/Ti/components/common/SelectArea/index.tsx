import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getArea } from "../../../../../services/CenterCost.routes";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function SelectArea({ valueArea, onChangeArea }: any) {
  const [areas, setAreas] = useState<any>();

  /**
   * traer de nuevo todas las areas
   */
  const handleArea = async () => {
    const getAreas = await getArea();
    console.log("areas: ", getAreas);
    setAreas(getAreas?.data.data);
  };

  useEffect(() => {
    handleArea();
  }, []);

  return (
    <>
      <div className="inline-block w-full">
        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
          Conectar Con Unidad De Negocio
        </label>
        <Selecting sx={{ m: 1, width: 0.98 }}>
          <InputLabel id="Selecciona_Unidad_De_Negocio_A_Conectar_label">
            Selecciona Unidad De Negocio A Conectar
          </InputLabel>
          <Select
            label="Selecciona Unidad De Negocio A Conectar"
            labelId="Selecciona Unidad De Negocio A Conectar-label"
            id="Selecciona_Unidad_De_Negocio_A_Conectar"
            value={valueArea}
            onChange={onChangeArea}
            autoWidth
            required={true}
            autoComplete={"off"}
          >
            <MenuItem value="">
              <em>Asigna Una Unidad De Negocio</em>
            </MenuItem>
            {Array.isArray(areas) &&
              areas.map((item: any, index: any) => (
                <MenuItem key={index} value={item}>
                  {item.number} - {item.name}
                </MenuItem>
              ))}
          </Select>
        </Selecting>
      </div>
    </>
  );
}

export default SelectArea;

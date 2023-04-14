import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import {
  getArea,
  getAllSubAreas,
} from "../../../../../services/CenterCost.routes";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});

function SelectArea({
  isArea,
  isSubArea,
  valueArea,
  onChangeArea,
  valueSubArea,
  onChangeSubArea,
  update,
}: any) {
  const [area, setArea] = useState<any>();
  const [subArea, setSubArea] = useState<any>();

  /**
   * ejecuta las 2 funciones area y subarea
   */
  const handleList = () => {
    handleArea();
    handleSubArea();
  };
  /**
   * traer de nuevo todas las areas
   */
  const handleArea = async () => {
    const area = await getArea();
    setArea(area?.data.data);
  };
  /**
   * trae de nuevo todas las subareas
   */
  const handleSubArea = async () => {
    const subArea = await getAllSubAreas();
    setSubArea(subArea?.data.data);
  };
  const List = ({
    children,
    title,
    placeholder,
    index,
    value,
    onChange,
    required,
    disabled,
    autoComplete,
    name,
    itemDefault,
    listItems,
  }: any) => {
    return (
      <div>
        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
          {title}
        </label>
        <Selecting sx={{ m: 1, width: 0.98 }}>
          <InputLabel id={`${placeholder}-label`}>{placeholder}</InputLabel>
          <Select
            key={index}
            label={placeholder}
            labelId={`${placeholder}-label`}
            id={placeholder}
            value={value}
            onChange={onChange}
            autoWidth
            required={required}
            disabled={disabled}
            autoComplete={"off" || autoComplete}
            name={name}
          >
            <MenuItem value="">
              <em>{itemDefault}</em>
            </MenuItem>
            {Array.isArray(listItems) &&
              listItems.map((item: any, index: any) => (
                <MenuItem key={index} value={item.id}>
                  {item.number} - {item.name}
                </MenuItem>
              ))}
          </Select>
        </Selecting>
      </div>
    );
  };

  useEffect(() => {
    handleList();
  }, []);
  // useEffect(() => {
  //   handleList();
  // }, [update]);

  return (
    <>
      {isArea && (
        <div className="inline-block w-1/2">
          <List
            title="Conectar Con Unidad De Negocio "
            placeholder="Selecciona Unidad De Negocio A Conectar"
            value={valueArea}
            onChange={onChangeArea}
            required
            itemDefault="Asigna Una Unidad De Negocio"
            listItems={area}
          />
        </div>
      )}
      {isSubArea && (
        <div className="inline-block w-1/2">
          <List
            title="Conectar Con Cedi"
            placeholder="Selecciona Una Cedi A Conectar"
            value={valueSubArea}
            onChange={onChangeSubArea}
            required
            itemDefault="Asigna Cedi"
            listItems={subArea}
          />
        </div>
      )}
    </>
  );
}

export default SelectArea;

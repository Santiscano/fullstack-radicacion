import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import {
  getArea,
  getSubAreaById,
  getCostCenterById,
} from "../../../../../services/CenterCost.routes";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
export default function InputSelect(props: any) {
  console.log("props: ", props);
  const [area, setArea] = useState<any>();
  const [subArea, setSubArea] = useState<any>();
  const [costCenter, setCostCenter] = useState<any>();

  const handleList = async () => {
    const area = await getArea();
    console.log("area: ", area);
    setArea(area?.data.data);
  };

  const handleSubArea = async () => {
    console.log("props.valueArea: ", props.valueArea);
    const subArea = await getSubAreaById(props.valueArea?.id);
    console.log("subArea: ", subArea);
    setSubArea(subArea?.data.data);
  };

  const handleCostCenter = async () => {
    const centerCost = await getCostCenterById(props.valueSubArea?.id);
    console.log("centerCost: ", centerCost);
    setCostCenter(centerCost?.data.data);
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
                <MenuItem key={index} value={item}>
                  {item.name} - {item.number}
                </MenuItem>
              ))}
          </Select>
        </Selecting>
      </div>
    );
  };

  useEffect(() => {
    handleSubArea();
  }, [props.valueArea]);

  useEffect(() => {
    handleCostCenter();
  }, [props.valueSubArea]);

  useEffect(() => {
    handleList();
  }, []);

  return (
    <>
      <div className="inline-block w-1/2">
        <List
          title="Agregar Area "
          placeholder="Selecciona centro de costos"
          value={props.valueArea}
          onChange={props.onChangeArea}
          required
          itemDefault="Asigna un Centro de Costos"
          listItems={area}
        />
      </div>
      <div className="inline-block w-1/2">
        <List
          title="Agregar SubArea"
          placeholder="Selecciona centro de costos"
          value={props.valueSubArea}
          onChange={props.onChangeSubArea}
          required
          disabled={!props.valueArea}
          itemDefault="Asigna un Centro de Costos"
          listItems={subArea}
        />
      </div>
      <div className="inline-block w-1/2">
        <List
          title="Agregar Centro de Costos"
          placeholder="Selecciona centro de costos"
          value={props.valueCostCenter}
          onChange={props.onChangeCostCenter}
          required
          disabled={!props.valueSubArea}
          itemDefault="Asigna un Centro de Costos"
          listItems={costCenter}
        />
      </div>
    </>
  );
}

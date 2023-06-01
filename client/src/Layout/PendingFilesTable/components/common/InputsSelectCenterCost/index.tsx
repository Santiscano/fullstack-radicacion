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
import { remove } from "../../../../../components/tools/SesionSettings";
import { useNavigate } from "react-router-dom";

const Selecting = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2759cd",
    },
  },
});
export default function InputSelect(props: any) {
  const [area, setArea] = useState<any>();
  const [subArea, setSubArea] = useState<any>();
  const [costCenter, setCostCenter] = useState<any>();
  const navigate = useNavigate();

  const handleList = async () => {
    try{
      const area = await getArea();
      setArea(area?.data.data);
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

  const handleSubArea = async () => {
    try {
      const subArea = await getSubAreaById(props.valueArea?.id);
      setSubArea(subArea?.data.data);
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

  const handleCostCenter = async () => {
    try {
      const centerCost = await getCostCenterById(props.valueSubArea?.id);
      setCostCenter(centerCost?.data.data);
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
          title="Agregar Operacion "
          placeholder="Selecciona Operacion"
          value={props.valueArea}
          onChange={props.onChangeArea}
          required
          itemDefault="Asigna una Operacion"
          listItems={area}
        />
      </div>
      <div className="inline-block w-1/2">
        <List
          title="Agregar Cedi"
          placeholder="Selecciona Cedi"
          value={props.valueSubArea}
          onChange={props.onChangeSubArea}
          required
          disabled={!props.valueArea}
          itemDefault="Asigna una Cedi"
          listItems={subArea}
        />
      </div>
      <div className="inline-block w-1/2">
        <List
          title="Agregar Dependencia"
          placeholder="Selecciona Dependencia"
          value={props.valueCostCenter}
          onChange={props.onChangeCostCenter}
          required
          disabled={!props.valueSubArea}
          itemDefault="Asigna un Dependencia"
          listItems={costCenter}
        />
      </div>
    </>
  );
}

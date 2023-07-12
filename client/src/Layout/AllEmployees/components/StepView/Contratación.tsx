import { FC, useState } from "react";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import InputSelect from "../../../../components/common/InputSelect";
import { optionCediHiring } from "../../../../components/tools/OptionsValuesSelects";
import { optionIsActive } from "../../../../components/tools/OptionsValuesSelects"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Contratación: FC<{handleNext:()=>void}> = ({handleNext}) => {
  const [locale, setlocale] = useState("es");
  const user = useAppSelector((state) => state.employeesSlice);
  const {
    setHiringEntryDate,
    setPositionName,
    setHiringSalary,
    setShirtSize,
    setPantSize,
    setShoeSize,
    setEps,
    setCompensationFund,
    setPension,
    setLayoffs,
    setArl,
    setHiringCostCenter,
    setCompanyName,
    setUsersStatus
  } = useEmployee();
  return (
    <>
      <form>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fecha De Ingreso Contratación
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
              <DemoContainer components={['DatePicker']}
                sx={{
                  "& .MuiFormControl-root": {
                    width:"100%",
                    borderColor: "#2759cd",
                    "&:hover fieldset": {
                      borderColor: "#2759cd",
                    }},
                  width:"100%",
                }}
              >
                <DatePicker
                  value={user.hiring_entry_Date}
                  // @ts-ignore
                  onChange={setHiringEntryDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Cargo Laboral
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Nombre Posición Laboral"
              value={user.position_name}
              setValue={setPositionName}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Salario Contratación
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Salario Contratación"
              value={user.hiring_salary}
              setValue={setHiringSalary}
            />
          </article>
          <article className="md:w-1/2">
            <InputSelect
              label="CEDI"
              title="CEDI"
              placeholder="CEDI"
              required
              value={user.company_name}
              onChange={setCompanyName}
              itemDefault="selecciona CEDI"
              items={optionCediHiring}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Talla Camisa
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Talla Camisa"
              value={user.shirt_size}
              setValue={setShirtSize}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Talla Pantalón
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Talla Pantalón"
              value={user.pant_size}
              setValue={setPantSize}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Talla Zapatos
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Talla Zapatos"
              value={user.shoe_size}
              setValue={setShoeSize}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              EPS
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Eps"
              value={user.eps}
              setValue={setEps}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Pensión
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Pensión"
              value={user.pension}
              setValue={setPension}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Caja de Compensación Familiar
            </label>
            <TextFieldOutlined
              type={"text"}
              label="caja compensación"
              value={user.compensation_fund}
              setValue={setCompensationFund}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Cesantías
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Cesantías"
              value={user.layoffs}
              setValue={setLayoffs}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              ARL
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Arl"
              value={user.arl}
              setValue={setArl}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Centro De Costos De Contratación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Centro De Costos De Contratación"
              value={user.hiring_cost_center}
              setValue={setHiringCostCenter}
            />
          </article>
          <article className="md:w-1/2">
            <InputSelect
              label="Estado"
              title="Estado"
              placeholder="Estado"
              required
              value={user.users_status}
              onChange={setUsersStatus}
              itemDefault="selecciona Estado"
              items={optionIsActive}
            />
          </article>
        </div>
      </form>
    </>
  );
};

export default Contratación;

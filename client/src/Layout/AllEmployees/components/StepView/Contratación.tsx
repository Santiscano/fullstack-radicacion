import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import InputSelect from "../../../../components/common/InputSelect";
import { optionCediHiring } from "../../../../components/tools/OptionsValuesSelects";

const Contratación = () => {
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
  } = useEmployee();
  return (
    <>
      <form>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fecha De Ingreso Contratación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Fecha De Ingreso Contratación"
              value={user.hiring_entry_Date}
              setValue={setHiringEntryDate}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nombre Posición Laboral
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
              label="Estado"
              title="Estado"
              placeholder="Estado"
              required
              value={user.company_name}
              onChange={setCompanyName}
              itemDefault="selecciona Estado"
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
        </div>
      </form>
    </>
  );
};

export default Contratación;

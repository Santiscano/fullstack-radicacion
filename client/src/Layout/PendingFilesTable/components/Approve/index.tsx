// @ts-nocheck
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import { get, roles } from "../../../../components/tools/SesionSettings";
import { editFile } from "../../../../services/Files.routes";
import InputsSelectCenterCost from "../common/InputsSelectCenterCost";
import { GeneralValuesContext } from "./../../../../Context/GeneralValuesContext";

function Approve({
  user,
  newAssigned,
  setRedirectTo,
  activitySelect,
  setActivitySelect,
}: any) {
  console.log("user: ", user);
  const [state, setState] = useState<any>();
  const [area, setArea] = useState<any>({
    id: 0,
    number: "",
    name: "",
  });
  const [subArea, setSubArea] = useState<any>({
    id: 0,
    fk: 0,
    number: "",
    name: "",
  });
  const [centerCost, setCenterCost] = useState({
    id: 0,
    fk: 0,
    number: "",
    name: "",
  });
  const [codeAccounting, setCodeAccounting] = useState("");
  const [comments, setComments] = useState("");

  const {
    setPreLoad,
    handleOpenModalAuth,
    handleCloseModalAuth,
    rows,
    setRows,
    handleUpdateRows,
  } = useContext(GeneralValuesContext);

  const handleState = (e: any) => setState(e.target.value);
  const handleArea = (e: any) => {
    setArea(e.target.value);
    setSubArea("");
    setCenterCost("");
  };
  const handleSubArea = (e: any) => {
    setSubArea(e.target.value);
    setCenterCost("");
  };
  const handleCenter = (e: any) => setCenterCost(e.target.value);
  const handleComments = (e: any) => setComments(e.target.value);

  const handleClear = () => {
    setActivitySelect("");
    setRedirectTo("");
    setArea("");
    setComments("");
    setPreLoad(false);
    handleOpenModalAuth();
  };

  const handleSubmit = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const response = await editFile(
        user.idfiles,
        user.idproviders,
        newAssigned,
        activitySelect,
        user.files_type,
        user.files_registered,
        user.files_cost_center == null
          ? `${area?.number}${subArea?.number}${centerCost?.number}`
          : user.files_cost_center,
        user.files_code_accounting == null &&
          Number(get("idroles")) == roles.Contaduria
          ? codeAccounting
          : user.files_code_accounting,
        user.files_code_treasury,
        user.files_price,
        user.files_account_type,
        user.files_account_type_number,
        comments
      );
      if (response?.status == 200) {
        handleClear();
        handleUpdateRows();
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(true);
    }
  };

  return (
    <section className="flex flex-wrap w-full items-center justify-between ">
      <form className="w-full my-0" onSubmit={handleSubmit}>
        {user.files_cost_center == null && (
          <InputsSelectCenterCost
            valueArea={area}
            onChangeArea={handleArea}
            valueSubArea={subArea}
            onChangeSubArea={handleSubArea}
            valueCostCenter={centerCost}
            onChangeCostCenter={handleCenter}
          />
        )}
        {user.files_code_accounting == null &&
          Number(get("idroles")) == roles.Contaduria && (
            <article className="md:w-1/2">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Codigo Contabilidad
              </label>
              <TextFieldOutlined
                type={"text"}
                label={"Codigo Contabilidad"}
                value={codeAccounting}
                setValue={setCodeAccounting}
                required
              />
            </article>
          )}
        <div className="flex mt-4 w-full">
          <textarea
            name="Comentario"
            id="comentary"
            placeholder="Es necesario dejar alguna observacion"
            className="border-neutral-300 border-2 resize-none w-full my-1 h-24"
            required
            value={comments}
            onChange={handleComments}
          ></textarea>
        </div>

        <div className="flex mt-1 w-full">
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mx: 2, my: 1 }}
          >
            Aprobar
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Approve;

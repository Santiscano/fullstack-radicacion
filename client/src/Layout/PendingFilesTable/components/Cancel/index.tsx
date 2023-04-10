import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GeneralValuesContext } from "./../../../../Context/GeneralValuesContext";
import { editFile } from "./../../../../services/Files.routes";

function Cancel({ user, activitySelect, setActivitySelect }: any) {
  console.log("user: ", user);
  const [comments, setComments] = useState("");
  const { handleOpenModalAuth, handleUpdateRows } =
    useContext(GeneralValuesContext);

  const handleComments = (e: any) => setComments(e.target.value);
  const handleClear = () => {
    setActivitySelect("");
    setComments("");
    handleOpenModalAuth();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await editFile(
      user.idfiles,
      user.idproviders,
      1,
      activitySelect,
      user.files_type,
      user.files_registered,
      user.files_cost_center,
      user.files_code_accounting,
      user.files_code_treasury,
      user.files_price,
      user.files_account_type,
      user.files_account_type_number,
      comments
    );
    console.log(response);
    if (response?.status == 200) {
      handleClear();
      handleUpdateRows();
    }
  };

  return (
    <section className="flex flex-wrap w-full items-center justify-between ">
      <form className="w-full my-0" onSubmit={handleSubmit}>
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
            color="error"
            sx={{ mx: 2, my: 1 }}
          >
            Rechazar
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Cancel;

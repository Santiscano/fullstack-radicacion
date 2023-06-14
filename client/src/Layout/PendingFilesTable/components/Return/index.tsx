import { Button } from "@mui/material";
import { useState } from "react";
import { editFile } from "../../../../services/Files.routes";
import useContextProvider from "./../../../../Context/GeneralValuesContext";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import { useNavigate } from "react-router-dom";
import { remove } from "../../../../components/tools/SesionSettings";

function Return({
  redirectTo,
  setRedirectTo,
  activitySelect,
  setActivitySelect,
}: any) {
  const [comments, setComments] = useState("");
  const { handleUpdateRows } = useContextProvider();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.modalUserViewSlice);

  const handleComments = (e: any) => setComments(e.target.value);
  const handleClear = () => {
    setActivitySelect("");
    setRedirectTo("");
    setComments("");
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await editFile(
        user.idfiles,
        user.idproviders,
        redirectTo,
        activitySelect,
        user.files_type,
        user.files_registered,
        user.files_cost_center,
        // @ts-ignore
        user.files_code_accounting,
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


  return (
    <section className="flex flex-wrap w-full items-center justify-between ">
      <form className="w-full my-0" onSubmit={handleSubmit}>
        <div className="flex mt-4 w-full">
          <textarea
            name="Comentario"
            id="comentary"
            placeholder="deja un comentario opcional"
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
            color="secondary"
            sx={{ mx: 2, my: 1 }}
          >
            Re-Asignar
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Return;

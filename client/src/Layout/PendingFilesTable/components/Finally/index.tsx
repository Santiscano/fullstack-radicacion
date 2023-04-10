import { Button, SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import Upload from "../../../../components/common/Upload";
import { get, roles } from "../../../../components/tools/SesionSettings";
import { editFile } from "../../../../services/Files.routes";
import { createFilePath } from "../../../../services/FilesPath.routes";
import { uploadfile } from "../../../../services/Pdf.routes";
import { GeneralValuesContext } from "./../../../../Context/GeneralValuesContext";

function Finally({ user, endActivitySelect }: any) {
  console.log("user: ", user);
  const [codeTreasury, setCodeTreasury] = useState("");
  const [filePDF, setFilePDF] = useState("");
  const [fileName, setFileName] = useState("");
  const [comments, setComments] = useState("");
  const { setPreLoad, handleOpenModalAuth, handleUpdateRows } =
    useContext(GeneralValuesContext);

  const handleComments = (e: any) => setComments(e.target.value);
  const handleClear = () => {
    setFilePDF("");
    setFileName("");
    setComments("");
    setPreLoad(false);
    handleUpdateRows();
  };
  const handleChangeFile = (e: SelectChangeEvent) => {
    // @ts-ignore
    console.log("archivo capturado", e.target.files[0]);
    // @ts-ignore
    setFilePDF(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setFileName(fileNameEvent);
  };
  const handleSubmit = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const response = await editFile(
        user.idfiles,
        user.idproviders,
        1,
        endActivitySelect,
        user.files_type,
        user.files_registered,
        user.files_cost_center,
        user.files_code_accounting,
        // @ts-ignore
        user.files_code_treasury == null && codeTreasury,
        user.files_price,
        user.files_account_type,
        user.files_account_type_number,
        comments
      );
      if (response?.status == 200) {
        handleFileSubmit(e);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };
  const handleFileSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const responseUploadFile = await uploadfile(filePDF, user.idfiles); // idfiles es 1 porque se enviara a admin donde se almacenaran todos
      const pathFileUpload = await responseUploadFile?.data.pathFile; // almacena ruta asignada en variable

      const responseConcatFilePath = await createFilePath(
        user.idfiles,
        pathFileUpload,
        comments,
        get("idusers")
      );
      if (responseConcatFilePath?.status == 200) {
        handleClear();
        handleOpenModalAuth();
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
    }
  };
  return (
    <section className="flex flex-wrap w-full items-center justify-between ">
      <form className="w-full my-0" onSubmit={handleSubmit}>
        {user.files_code_treasury == null &&
          Number(get("idroles")) == roles.Tesoreria && (
            <article className="md:w-1/2">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Codigo Tesoreria
              </label>
              <TextFieldOutlined
                type={"text"}
                label={"Codigo Tesoreria"}
                value={codeTreasury}
                setValue={setCodeTreasury}
                required
              />
            </article>
          )}
        <Upload
          file={filePDF}
          fileName={fileName}
          handleChangeFile={handleChangeFile}
        />
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
            Aprobar - Finalizar
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Finally;

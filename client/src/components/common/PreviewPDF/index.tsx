import "./preview.css";
import pdf from "../../../assets/Requerimientos.pdf";

// icons
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import Button from "../Button";

function PreviewPDF() {
  // methods
  const openPdf = () => {
    console.log("funcionando");
    window.open(pdf);
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <label className="block mb-2 ml-4 text-base font-semibold dark:text-white">
          Previsualizacion PDF
        </label>
        <div className="mr-4">
          <FullscreenOutlinedIcon
            sx={{ color: "#6b7280" }}
            onClick={openPdf}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* input */}
      <div className="full-view flex items-center justify-center w-full cursor-pointer rounded">
        <object className="view-pdf" type="application/pdf" data={pdf}></object>
      </div>
      <Button name="Aprobar" />
    </>
  );
}

export default PreviewPDF;

import { SyntheticEvent, useEffect, useState } from "react";
import requerimientos from "../../assets/Requerimientos.pdf";
import LOGO from "../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal"
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = StyleSheet.create({
  page: {},
  view: {},
  image: { width: "90px", marginLeft: "15px" },
  text: {
    fontSize: "10px",
    width: "100%",
    marginTop: "5px",
    marginLeft: "15px",
  },
});

function AllEmployees({
  cediType = "propio",
  settledNumber = "123456",
  accountType = "administrativa",
}: any) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };
  const handleMouseMove = (event: any) => {
    if (isDragging) {
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;
      setPosition({ x: position.x + deltaX, y: position.y + deltaY });
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection("Todos los Empleados");
  },[])

  return (
    <div>
      <div
        style={{ position: "absolute", left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <p>¡Mueve este elemento haciendo clic y arrastrando!</p>
        <p>este no mueve</p>
      </div>
    </div>
  );
}

export default AllEmployees;

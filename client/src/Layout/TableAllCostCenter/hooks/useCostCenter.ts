import { useContext, useEffect, useState } from "react";
import { centerCostTable } from "../../../services/CenterCost.routes";
import { GeneralValuesContext } from "../../../Context/GeneralValuesContext";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";
import { remove } from "../../../components/tools/SesionSettings";
import { useNavigate } from "react-router-dom";


function useCostCenter () {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContext(GeneralValuesContext);
  const navigate = useNavigate();

  const { changeTitleSection } = useDataGlobal();

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await centerCostTable();
      console.log("rows: ", table.data);
      const rows = table?.data;
      setRow(rows ? rows : []);
    } catch (err) {
      // @ts-ignore
      console.log("error ejecutado",err.response.data.message);
      // @ts-ignore
      const message = err.response.data.message;
      if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
        remove("accessToken");
        navigate("/login");
      }
    } finally {
      setPreLoad(false);
    }
  };

  useEffect(() => {
    handleGetTableData();
    changeTitleSection("CENTROS DE COSTO")
  }, []);

  return {
    row
  };
}

export default useCostCenter;

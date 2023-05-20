import { useContext, useEffect, useState } from "react";
import { centerCostTable } from "../../../services/CenterCost.routes";
import { GeneralValuesContext } from "../../../Context/GeneralValuesContext";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";


function useCostCenter () {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContext(GeneralValuesContext);

  const { changeTitleSection } = useDataGlobal();

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await centerCostTable();
      console.log("rows: ", table.data);
      const rows = table?.data;
      setRow(rows ? rows : []);
    } catch (error) {
      console.log("error: ", error);
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

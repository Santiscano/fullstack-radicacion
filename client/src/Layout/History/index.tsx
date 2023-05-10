import { useEffect } from "react";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal"
import DataTableHistory from "./components/DataTableHistory";
import useHistory from "./hooks/useHistory";

const History = () => {
  const { changeTitleSection } = useDataGlobal();
  const { rows } = useHistory();

  useEffect(() => {
    changeTitleSection("Historial");
    return () => {
      changeTitleSection("");
    }
  },[])
  return (
    <main className='layout'>
      <section className='layout-section'>
      <div className="layout-left">
        <div className="filing mt-8">
          <section className="viewTableEdit">
            <DataTableHistory row={rows}/>
          </section>
        </div>
      </div>
      </section>
    </main>
  )
}

export default History;

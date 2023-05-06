import { useEffect } from "react";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal"

const History = () => {
  const { changeTitleSection } = useDataGlobal();

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

      </div>
      </section>
    </main>
  )
}

export default History;

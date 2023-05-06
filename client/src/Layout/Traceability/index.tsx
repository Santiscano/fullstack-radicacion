import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal"

const Traceability = () => {
  const { changeTitleSection } = useDataGlobal();
  return (
    <main className='layout'>
      <section className='layout-section'>
      <div className="layout-left">

      </div>
      </section>
    </main>
  )
}

export default Traceability;

import DataTablePending from "./components/common/DataTablePending";
import { usePending } from "./Hooks/usePending";

function PendingFilesTable() {
  const { rows } = usePending();

  return (
    <div className="layout">
      <section className="layout-section">
        <div className="layout-left">
          <h3 className="container__createFiling createFiling">
            Pendientes por Autorizar
          </h3>
          <h3 className="container__createFiling createFiling">
            Falta refrescar los datos despues de actualizados
          </h3>
          <div className="filing">
            <section className="viewTableEdit">
              <DataTablePending row={rows} />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PendingFilesTable;

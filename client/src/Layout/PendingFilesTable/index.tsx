import { useEffect } from "react";
import { useModalUserView } from "../../redux/Redux-actions/useModalUserView";
import { usePending } from "./Hooks/usePending";
import DataTablePending from "./components/common/DataTablePending";

function PendingFilesTable() {
  const { rows } = usePending();

  return (
    <div className="layout">
      <section className="layout-section">
        <div className="layout-left">
          <div className="filing mt-8">
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

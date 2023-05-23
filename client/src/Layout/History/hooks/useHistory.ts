import { useEffect } from 'react';
import useContextProvider from '../../../Context/GeneralValuesContext';
import { useDataGlobal } from '../../../redux/Redux-actions/useDataGlobal';
import { showTableHistory } from '../../../services/showTable.routes';

function useHistory () {
  const { setPreLoad, rows, setRows } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();

  const handleGetHistoryTable = async () => {
    try{
      setPreLoad(true);
      const historyTable = await showTableHistory()
      console.log('historyTable: ', historyTable);
      const rowData = await historyTable?.data.data;
      console.log('rowData: ', rowData);
      setRows(rowData ? rowData : []);
    }catch(error){
      console.log('history table:', error)
    }finally{
      setPreLoad(false);
    }
  };

  useEffect(() => {
    changeTitleSection("HISTORIAL");
    handleGetHistoryTable();
    return () => {
      changeTitleSection("")
    }
  },[])
  return {
    rows,
  };
};

export default useHistory;



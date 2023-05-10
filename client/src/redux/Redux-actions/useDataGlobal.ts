import { setTitleSection } from "../Redux-reducer/dataGlobalSlice";
import { useDispatch } from 'react-redux';

export const useDataGlobal = () => {
  const dispatch = useDispatch();

  const changeTitleSection = (title:string) => {
    dispatch(setTitleSection(title));
  };

  return {
    changeTitleSection,
  };
};

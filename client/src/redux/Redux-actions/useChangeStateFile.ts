import { changeStateFile, changeStateFileType } from "../Redux-reducer/changeStateFileSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useChangeStateFile = () => {
  const dispatch = useAppDispatch();

  const changeState = (state: changeStateFileType) => {
    dispatch(changeStateFile(state));
  };

  return {
    changeState,
  }
};


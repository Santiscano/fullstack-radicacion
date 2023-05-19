import { setModalUserView, setRemoveUserView } from "../Redux-reducer/modalUserViewSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useModalUserView = () => {
  const dispatch = useAppDispatch();

  const addModalUser = (user:any) => {
    console.log('por aqui paso', user)
    dispatch(setModalUserView(user));
  };

  const removeModalUser = () => {
    dispatch(setRemoveUserView());
  };

  return {
    addModalUser,
    removeModalUser,
  };
};


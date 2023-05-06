import { setUserSession, setRemoveUserSession } from "../Redux-reducer/userSessionSlice";
import { useAppDispatch } from "../hooks/useStore";

export const useUserSession = () => {
  const dispatch = useAppDispatch();

  const addUserSession = (user:any) => {
    dispatch(setUserSession(user));
  };

  const removeUserSession = () => {
    dispatch(setRemoveUserSession());
  };

  return {
    addUserSession,
    removeUserSession,
  };
};

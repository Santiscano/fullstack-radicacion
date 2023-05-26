import { createContext, useContext, FC, SyntheticEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { remove } from "../components/tools/SesionSettings";

interface HooksTokenProviderProps {
  children: ReactNode;
}

export interface HooksTokenType {
  finishedSession: () => void;
}

export const HooksTokenContext = createContext<HooksTokenType>({
  finishedSession: () => {},
})

const HooksTokenProvider: FC<HooksTokenProviderProps> = ({children}) => {
  // const navigate = useNavigate();

  const finishedSession = ()  => {
    // remove("accessToken");
    // navigate('/login')
  }

  return (
    <HooksTokenContext.Provider value={{finishedSession}}>
      {children}
    </HooksTokenContext.Provider>
  )
};

export default function useHooksToken() {
  return useContext(HooksTokenContext);
}

export { HooksTokenProvider};








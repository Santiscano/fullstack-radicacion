import { createContext, FC } from "react";


export const EmployeeContext = createContext({})

export const EmployeeProvider = ({children}:any) => {

  return (
    <EmployeeContext.Provider value={{}}>
      { children}
    </EmployeeContext.Provider>
  )
};

export default function useContextEmployeeProvider() {}

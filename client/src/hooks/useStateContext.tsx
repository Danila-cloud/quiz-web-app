import * as React from "react";
import { createContext, useContext, useState } from "react";

const initialState = {
    articipantId: 0,
    timeTaken: 0,
    selectOptions: [],
}

export const stateContext = React.createContext(undefined);

const getFreshContext = () => {
  return {
    participantId: 0,
    timeTaken: 0,
    selectOptions: [],
  };
};

export function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return { context, 
    setContext: obj => setContext({...context, ...obj}) };
}

export default function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());

  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  );
}

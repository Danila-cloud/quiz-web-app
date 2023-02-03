import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export const stateContext = React.createContext(undefined);

const getFreshContext = () => {
  if (localStorage.getItem("context") === null) {
    localStorage.setItem(
      "context",
      JSON.stringify({
        participantId: 0,
        timeTaken: 0,
        selectOptions: [],
      })
    );
  }
  return JSON.parse(localStorage.getItem("context"));
};

export function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return { context, setContext: (obj) => setContext({ ...context, ...obj }) };
}

export default function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
  }, [context])

  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  );
}

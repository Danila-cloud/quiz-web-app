import * as React from "react";
import { useContext } from "react";
import { stateContext, useStateContext } from "../hooks/useStateContext";

export default function Quiz() {
  const { context, setContext } = useStateContext()

  setContext({timeTaken: 1});

  return <div></div>;
}

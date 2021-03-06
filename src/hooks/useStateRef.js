import { useState } from "react";
import { useEvergreenRef } from "./useEvergreenRef";

export default function useStateRef(value) {
  const [state, setState] = useState(value);
  const stateRef = useEvergreenRef(state);
  const setStateRef = useEvergreenRef(setState);
  return [stateRef, setStateRef];
};

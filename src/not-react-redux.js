import { useMemo, useEffect, useContext } from "react";
import useStateRef from "./hooks/useStateRef.js";

export function useConnect(
  StoreContext,
  mapStateToProps = (s) => s,
  mapDispatchToProps = () => ({})
) {
  const [getState, subscribe, dispatch] = useContext(StoreContext);
  const initialState = useMemo(() => mapStateToProps(getState()), []);
  const actions = useMemo(() => mapDispatchToProps(dispatch), [dispatch]);
  const [localStateRef, setLocalState] = useStateRef(initialState);

  useEffect(() => {
    return subscribe((state) => {
      // Shallow compare
      const newState = mapStateToProps(state);
      if (localStateRef.current.length !== newState.length) {
        setLocalState(mapStateToProps(state));
      } else {
        for (let prop in localStateRef.current) {
          if (localStateRef.current[prop] !== newState[prop]) {
            setLocalState(mapStateToProps(state));
            break;
          }
        }
      }
    });
  }, [subscribe, localStateRef]);

  return useMemo(() => [
    localStateRef.current,
    actions
  ], [localStateRef.current, actions]);
};
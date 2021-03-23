import { useEffect, useState } from "react";
import { emitter, store, KeyType, Action, Dispatch } from "./utils";

export default function useStore<T>(
  key: KeyType,
  initVal?: T
): [T, Dispatch<T>] {
  const initState = (store.has(key)
    ? store.get(key)
    : (store.set(key, initVal), initVal)) as T;

  if (initState === undefined) throw new Error("Please provide initial Value");

  const [state, setState] = useState(initState);

  useEffect(() => {
    emitter.on(key, setState);
    return () => emitter.off(key, setState);
  });

  function wrap(fn: typeof setState) {
    return function (arg: T | Action<T>) {
      let result: T;
      if (arg instanceof Function) fn((result = arg(state)));
      else fn((result = arg));
      store.set(key, result);
    };
  }

  return [state, wrap(setState)];
}

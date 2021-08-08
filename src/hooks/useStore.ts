import React, { useEffect, useState } from "react";
import store from "../store";
import { KeyType, Setter, Updater } from "../types";
import { emitter } from "../utils";
import { produce } from "immer";

export function useStore<T>(key: KeyType<T>, defaultValue?: T): [T, Setter<T>] {
  if (!store.has(key) && defaultValue) store.set(key, defaultValue);

  const initState = (store.get(key) ?? defaultValue) as T;

  if (initState === undefined) {
    throw new Error("Please define a store or provide default value");
  }

  const [state, setState] = useState<T>(initState);

  useEffect(() => {
    emitter.on(key, setState);
    return () => emitter.off(key, setState);
  }, [setState]);

  return [state, wrapSetter(setState, key)];
}

function wrapSetter<T>(
  originSetter: React.Dispatch<React.SetStateAction<T>>,
  key: KeyType<T>
) {
  return function updater(arg: T | Updater<T>) {
    if (arg instanceof Function) {
      originSetter((state) => {
        const newState = produce(state, (draft) => arg(draft));
        store.set(key, newState);
        return newState;
      });
    } else {
      originSetter(arg);
      store.set(key, arg);
    }
  };
}

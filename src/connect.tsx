import React, { useMemo } from "react";
import { useStore } from "./hooks/useStore";
import type { Setter, KeyType } from "./types";

export function connect<T, K extends object>(
  key: KeyType<T>,
  mapStoreToProps: (state: T, setState: Setter<T>) => K
) {
  return function connector<S extends K>(Comp: React.ComponentType<S>) {
    const Wrapper: React.FC<Omit<S, keyof K>> = function (props) {
      const [state, setState] = useStore(key);

      const storeProps = useMemo(
        () => ({ ...mapStoreToProps(state, setState), ...props }),
        [state, setState, props]
      ) as S;

      return <Comp {...storeProps} />;
    };

    return Wrapper;
  };
}

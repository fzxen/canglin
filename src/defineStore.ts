import store from "./store";
import { StoreKey } from "./types";

export function defineStore<T>(state: T) {
  const key: StoreKey<T> = Symbol();

  function mutate(state: T) {
    store.set(key, state);
  }

  mutate(state);

  return {
    key,
    mutate,
  };
}

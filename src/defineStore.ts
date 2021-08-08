import store from "./store";
import { StoreKey } from "./types";

export function defineStore<T>(key: StoreKey<T>, state: T) {
  if (store.has(key)) return;
  store.set(key, state);
}

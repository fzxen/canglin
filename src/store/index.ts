import { KeyType } from "../types";
import { emitter } from "../utils";

function createStore() {
  const store = new Map<KeyType<unknown>, unknown>();

  function set<T>(key: KeyType<T>, value: unknown) {
    store.set(key, value);
    emitter.emit(key, value);
  }

  function get<T>(key: KeyType<T>) {
    return store.get(key);
  }

  function has<T>(key: KeyType<T>) {
    return store.has(key);
  }

  return { set, get, has };
}

const store = createStore();

export default store;

import { emitter, KeyType } from "./utils";

export default class Store {
  private store = new Map<KeyType, unknown>();
  static instance: Store;

  set(key: KeyType, value: unknown) {
    this.store.set(key, value);
    emitter.emit(key, value);
  }
  get(key: KeyType) {
    return this.store.get(key);
  }
  has(key: KeyType) {
    return this.store.has(key);
  }
}

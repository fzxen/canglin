import { KeyType } from "./utils";

type Handler = (...args: any[]) => void;

export default class Emitter {
  private all = new Map<KeyType, Set<Handler>>();

  on(key: KeyType, handler: Handler) {
    let handlers: Set<Handler>;

    if (this.all.has(key)) handlers = this.all.get(key)!;
    else this.all.set(key, (handlers = new Set<Handler>()));

    handlers.add(handler);
  }

  off(key: KeyType, handler: Handler) {
    this.all.get(key)?.delete(handler);
  }

  emit<T>(key: KeyType, ...args: T[]) {
    let handlers: Set<Handler> | undefined;
    if ((handlers = this.all.get(key))) {
      handlers.forEach((fn) => fn.call(null, ...args));
    }
  }

  clear(key: KeyType) {
    this.all.get(key)?.clear();
  }
}

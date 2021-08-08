import { KeyType } from "../types";

type Handler = (...args: any[]) => void;

function createEmitter() {
  const dict = new Map<KeyType, Set<Handler>>();

  function on(key: KeyType, handler: Handler) {
    let handlers: Set<Handler>;

    if (dict.has(key)) handlers = dict.get(key)!;
    else dict.set(key, (handlers = new Set<Handler>()));

    handlers.add(handler);
  }

  function off(key: KeyType, handler: Handler) {
    dict.get(key)?.delete(handler);
  }

  function emit<T>(key: KeyType, ...args: T[]) {
    let handlers: Set<Handler> | undefined;
    if ((handlers = dict.get(key))) {
      handlers.forEach((fn) => fn.call(null, ...args));
    }
  }

  function clear(key: KeyType) {
    dict.get(key)?.clear();
  }

  return { on, off, emit, clear };
}

const emitter = createEmitter();

export default emitter;

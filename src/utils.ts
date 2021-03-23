import Store from "./Store";
import Emitter from "./Emitter";

export type KeyType = string | symbol;
export type Action<T> = (val: T) => T;
export type Dispatch<T> = (arg: Action<T> | T) => void;

export const store = new Store();
export const emitter = new Emitter();

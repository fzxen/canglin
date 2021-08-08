import type { Draft } from "immer";

export interface StoreKey<T> extends Symbol {}

export type KeyType<T = unknown> = StoreKey<T>;

export type Updater<T> = (draft: Draft<T>) => void;
export type Setter<T> = (stateOrUpdater: T | Updater<T>) => void;

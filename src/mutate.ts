import { KeyType, store } from "./utils";

export default function mutate(key: KeyType, value: unknown) {
  store.set(key, value);
}

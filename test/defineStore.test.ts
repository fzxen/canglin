import { renderHook, act } from "@testing-library/react-hooks";
import { useStore, StoreKey, defineStore } from "../src";

describe("defineStore", () => {
  const store = defineStore({
    name: "fzxen",
    hobby: ["basketball"],
  });

  test("definition", () => {
    const { result } = renderHook(() => useStore(store.key));
    const [user] = result.current;
    expect(user).toEqual({
      name: "fzxen",
      hobby: ["basketball"],
    });
  });

  test("mutate data", () => {
    const data = {
      name: "zxfan",
      age: 100,
      hobby: ["coding"],
    };

    const { result } = renderHook(() => useStore(store.key));

    act(() => {
      store.mutate(data);
    });

    const [state] = result.current;

    expect(state).toMatchObject(data);
  });
});

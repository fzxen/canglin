import { renderHook } from "@testing-library/react-hooks";
import { useStore, StoreKey, defineStore } from "../src";

describe("defineStore", () => {
  const USER: StoreKey<{
    name: string;
    hobby: string[];
  }> = Symbol();
  defineStore(USER, {
    name: "fzxen",
    hobby: ["basketball"],
  });

  test("definition", () => {
    const { result } = renderHook(() => useStore(USER));
    const [user] = result.current;
    expect(user).toEqual({
      name: "fzxen",
      hobby: ["basketball"],
    });
  });
});

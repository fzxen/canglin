import { renderHook, act } from "@testing-library/react-hooks";
import { mutate, useStore, StoreKey } from "../src";

describe("mutate", () => {
  const USER: StoreKey<{
    name: string;
    age: number;
  }> = Symbol();

  test("mutate data", () => {
    const data = {
      name: "zxfan",
      age: 100,
      hobby: ["coding"],
    };

    const { result } = renderHook(() =>
      useStore(USER, {
        name: "zzzzz",
        age: 20000,
      })
    );

    act(() => {
      mutate(USER, data);
    });

    const [state] = result.current;

    expect(state).toMatchObject(data);
  });
});

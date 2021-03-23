import { renderHook, act } from "@testing-library/react-hooks";
import { mutate, useStore } from "../src";

describe("mutate", () => {
  test("mutate data", () => {
    const data = {
      name: "zxfan",
      age: 100,
      hobby: ["coding"],
    };

    const { result } = renderHook(() =>
      useStore("user", {
        name: "zzzzz",
        age: 20000,
      })
    );

    act(() => {
      mutate("user", data);
    });

    const [state] = result.current;

    expect(state).toMatchObject(data);
  });
});

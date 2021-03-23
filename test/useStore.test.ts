import { renderHook, act } from "@testing-library/react-hooks";
import { useStore } from "../src";

describe("useStore", () => {
  test("init", () => {
    const { result } = renderHook(() => useStore("count", 0));

    const [state] = result.current;

    expect(state).toBe(0);
  });

  test("change", () => {
    const { result } = renderHook(() => useStore("count", 0));

    var [state, setState] = result.current;

    act(() => {
      setState((state) => state + 2);
    });

    var [state, setState] = result.current;

    expect(state).toBe(2);
  });

  test("multi-fc", () => {
    const { result: resultA } = renderHook(() =>
      useStore("user", {
        name: "zxfan",
        age: 100,
      })
    );

    var [stateA, setStateA] = resultA.current;

    const { result: resultB } = renderHook(() => useStore("user"));

    var [stateB, setStateB] = resultA.current;

    act(() => {
      setStateA((user) => ({ ...user, age: user.age + 1 }));
    });
    // act(() => {
    //   setStateB((user) => ({ ...user, name: "zxxxxfan" }));
    // });

    expect(resultA.current[0]).toMatchObject({ name: "zxfan", age: 101 });
    expect(resultA.current[0]).toBe(resultB.current[0]);
  });
});

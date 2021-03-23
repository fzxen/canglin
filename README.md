# Canglin

<ruby>仓<rt>cāng</rt></ruby><ruby>廪<rt>lǐn</rt></ruby> is a minimalist state management tool for React Hook.

## How To Use

Just like `useState`。`counter` is your state. `setCounter` is a setter.

`setCounter` receive a value or callback.

```typescript
import { useStore } from "canglin"

const [counter, setCounter] = useStore("counter", { count: 0 })

setCounter(counter => counter.count++) // or secCounter(1)

```

`useStore` will register state in Global Store when called first. if `useStore` is called again, it will return last store data and ignore the second parameter.

```typescript
import { useStore } from "canglin"

const [state1] = useStore("user", { name: 'Kevin'})
const [state2] = useStore("user")

state === state2 // true
```

we can mutate fully store with `mutate` instead of state setter.

```typescript

// a.js
import { useStore } from "canglin"

const [user, setUser] = useStore("user", { name: 'Kevin'})


// b.js
import { useStore } from "canglin"

mutate("user", { name: "Peter" })
```

## API

`canglin` only have two API

- useStore: `function useStore<T>(key: KeyType, initVal?: T | undefined): [T, Dispatch<T>]`
- mutate: `function mutate(key: KeyType, value: unknown): void`
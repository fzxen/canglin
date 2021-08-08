# Canglin

<ruby>仓<rt>cāng</rt></ruby><ruby>廪<rt>lǐn</rt></ruby> is a minimalist state management tool for React Hook.

Now, we support class component! 🎉🎉

## How To Use

### Define a store

```typescript
// store.ts

import { defineStore } from "canglin"

export const store = defineStore({
  name: "fzxen",
  hobby: ["basketball", "football"],
});

export const USER = store.key;
```

### Usage in function component

```tsx
// hook component
import React from "react"
import { useStore } from "canglin"
import { USER } from "./store"

function useUser() {
  const [user, setUser] = useStore(USER);

  function updateName(name: string) {
    setUser((user) => {
      user.name = name;
    });
  }

  function updateHobby(hobby: string) {
    setUser((user) => {
      // you can mutate state directly
      user.hobby.push(hobby);
    });
  }

  return {
    name: user.name,
    hobby: user.hobby,

    updateName,
    updateHobby,
  };
}

function Profile() {
  const { name, updateName } = useUser();

  function onInputChange(e) {
    updateName(e.target.value);
  }

  return (
    <div>
      <p>{name}</p>
      <input onChange={onInputChange} />
    </div>
  );
}

export default Profile;
```

### Usage in class component

```tsx
import React from "react"
import { connect } from "canglin"
import { USER } from "./store"

interface ProfileProps {
  name: string;
  updateName: (name: string) => void;
}
class Profile extends React.Component<ProfileProps> {
  onInputChange(e) {
    this.props.updateName(e.target.value);
  }

  render() {
    this.onInputChange = this.onInputChange.bind(this)
    
    return (
      <div>
        <p>{this.props.name}</p>
        <input onChange={this.onInputChange} />
      </div>
    );
  }
}

const connector = connect(USER, (user, setUser) => {
  function updateName(name: string) {
    setUser((user) => {
      user.name = name;
    });
  }

  // return value will merge into component props
  return {
    name: user.name,
    updateName,
  };
});

export default connector(Profile);
```

## API

1.`defineStore`: Define a store. Then return a store object

```typescript
function defineStore<T>(state: T): {
  key: StoreKey<T>;
  mutate: (state: T) => void;
}
```

- `store.key`: The identifier of store. You can get state by `useStore` which regard key as the first parameter
- `store.mutate`: mutate all state object.

<hr/>

2.`useStore`: The getter of store state.

```typescript
function useStore<T>(key: KeyType<T>, defaultValue?: T | undefined): [T, Setter<T>]
```
parameters:

- `key`: The key of store. It returned by `defineStore`. or you can define a store key like this:

```typescript
import { StoreKey } from "canglin"

const USER: StoreKey<{ name: string }> = Symbol()
```

- `defaultValue`: If you don't define store before useStore and provide defaultValue. It will do defineStore automatically.

return value:

- `state`: store state that you defined.
- `setter`: pass a state object or function to setter. you can mutate the state object directly because canglin support [immerjs](https://immerjs.github.io/immer/)

<hr/>

3.`connect`: You can map state to component props. It is useful for class component.

```typescript
function connect<T, K extends object>(key: KeyType<T>, mapStoreToProps: (state: T, setState: Setter<T>) => K): <S extends K>(Comp: React.ComponentType<S>) => React.FC<Omit<S, keyof K>>
```

parameters:

- `key`: same as above.
- `mapStoreToProps`: It is a function. its two parameters is equally to return value of useStore.

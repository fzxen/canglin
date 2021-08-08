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

# Canglin

<ruby>仓<rt>cāng</rt></ruby><ruby>廪<rt>lǐn</rt></ruby> is a minimalist state management tool for React Hook.

## How To Use

### Define a store

```typescript
// store.ts

import { defineStore, StoreKey } from "canglin"

interface UserState {
  name: string;
  hobby: string[]
}
export const USER: StoreKey<UserState> = Symbol()

export const store = defineStore(USER, {
  name: 'fzxen',
  hobby: ['basketball', 'football']
})
```

### Usage in hook

```tsx
// hook component
import React from "react"
import { useStore } from "canglin"
import { USER } from "./store"

function useUser() {
  const [user, setUser] = useStore(USER)
  
  function updateName(name: string) {
    setUser(name)
  }

  function updateHobby(hobby: string) {
    setUser(user => {
      // you can mutate state directly
      user.hobby.push(hobby)
    })
  }

  return {
    name: state.name,
    hobby: state.hobby,

    updateName,
    updateHobby
  }
}

function Profile() {
  const { name, updateName } = useUser()

  function onInputChange(e) {
    updateName(e.target.value)
  }

  return 
    <div>
      <p>{name}</p>
      <input onChange={onInputChange}/>
    </div>
}

export default Profile
```

### Usage in class component

```tsx
import React from "react"
import { connect } from "canglin"
import { USER } from "./types"

class Profile extends React.Component {
  render() {
    return 
      <div>
        <p>{name}</p>
        <input onChange={onInputChange}/>
      </div>
  }
}

const connector = connect(USER, (user, setUser) => {
  function updateName(name: string) {
    setUser(name)
  }

  function updateHobby(hobby: string) {
    setUser(user => {
      // you can mutate state directly
      user.hobby.push(hobby)
    })
  }

  // return value will merge into component props
  return {
    name: state.name,
    hobby: state.hobby,

    updateName,
    updateHobby
  }
})

export default connector(Profile)
```

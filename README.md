# Fractal Timeline

---

## Quick Start

- Install [yarn](https://yarnpkg.com/en/)
- Run `yarn`
- Run `yarn dev`

---

## Documenting

Documentation uses [styleguidest](https://react-styleguidist.js.org). See the component `SampleForStyleGuide` for how to do documentation.

---

## Development

All shared state is stored in the `game` reducer. When a new user connects to the **_game_**, they get a copy of everything in that state.

To send a message to all connected users, dispatch an action that contains the key `broadcast: true`. This action will be broadcast to all connected users. Example:

```js
export const actionThatGetsBroadcasted = (someData) => ({
  someDate,
  broadcast: true,
  type: 'SOME_TYPE',
});
```

All other users will receive that message (minus the `broadcast` key just as the user who sent it).

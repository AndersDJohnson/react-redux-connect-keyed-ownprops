# react-redux-connect-keyed-ownprops

> react-redux connect with factories, safely keyed by given ownProps.

[![npm](https://img.shields.io/npm/v/react-redux-connect-keyed-ownprops.svg)](https://www.npmjs.com/package/react-redux-connect-keyed-ownprops)
[![Travis CI](https://img.shields.io/travis/AndersDJohnson/react-redux-connect-keyed-ownprops.svg)](https://travis-ci.org/AndersDJohnson/react-redux-connect-keyed-ownprops)
[![Codecov](https://img.shields.io/codecov/c/github/AndersDJohnson/react-redux-connect-keyed-ownprops.svg)](https://codecov.io/gh/AndersDJohnson/react-redux-connect-keyed-ownprops)

## The Problem

When connecting a React component to Redux, you may need to refer to `ownProps`.
For optimal performance, the `react-redux` documentation
recommends using [factory functions](https://react-redux.js.org/api/connect#factory-functions),
so that your component does not have to re-execute `mapStateTo*` functions on every prop change.

Some reach for a library like `re-reselect` which does selector routing based on dynamic
arguments from `ownProps`, but this misses the optimzation of the factory function.

But using the factory functions means your component instance
will not respond to changes in values consumed from `ownProps`.
One workaround for this is to use `key` props at consumption-site.
But then consumers have to know which props your `makeMapStateTo*` rely on internally.

## The Solution

This library encapsulates this by offering a higher-order component (HOC) `connectOwnProps`,
which behaves almost identically to `connect` from `react-redux`, but with an additional
first argument specifying `ownProps` needed in `mapStateTo*` or `makeMapStateTo*` functions,
and that it manages an internal `key` on the `connect`ed component, which it keeps up to date
while monitoring the specified `ownProps` for changes (shallow compare), and when it updates,
triggers a new component instance to be created, which re-executes its internal
`makeMapStateTo*` factory functions.

It also provides the managed subset of `ownProps` as a second argument to your `mapStateTo*` or `makeMapStateTo*` functions, instead of the full set, which encourages
safe usage by disallowing access to initial values decoupled from re-instancing.

## Example

See a live demo here: https://andersdjohnson.github.io/react-redux-connect-keyed-ownprops

Here's some sample code:

```js
import connectOwnProps from 'react-redux-connect-keyed-ownprops'

// ...

const makeMapStateToProps = (state, pickedOwnProps) => {
  // Now `pickedOwnProps` has only the props requested below.
  const selectMyProp = makeSelectMyProp(pickedOwnProps.myProp)

  return state => ({
    myProp: selectMyProp(state)
  })
}

export default connectOwnProps(
  ['myProp', 'myProp2'], // Specify to pluck these props from `ownProps`.
  makeMapStateToProps
)(MyComponent)
```

## Pick Props

You can specify which `ownProps` to pick by using an array of keys, e.g.:

```js
export default connectOwnProps(['myProp', 'myProp2'], makeMapStateToProps)(
  MyComponent
)
```

Or just a single key:

```js
export default connectOwnProps('myProp', makeMapStateToProps)(MyComponent)
```

Or a custom function to select from `ownProps` (or derive relevant values).
The output of this function is what will be shallow-compared for changes to manage the internal `key`.

```js
export default connectOwnProps(
  ownProps => ({
    myProp: ownProps.myProp
  }),
  makeMapStateToProps
)(MyComponent)
```

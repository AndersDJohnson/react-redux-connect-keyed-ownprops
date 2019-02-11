import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import shallowequal from 'shallowequal'

const pickOwnProps = (propNames, ownProps) =>
  typeof propNames === 'function'
    ? propNames(ownProps)
    : (Array.isArray(propNames) ? propNames : [propNames]).reduce(
        (acc, propName) => ({
          ...acc,
          [propName]: ownProps[propName]
        }),
        {}
      )

const makeMakeMapFunction = (propNames, makeOrMapFunction) => {
  if (typeof makeOrMapFunction !== 'function') return makeOrMapFunction

  const makeMapFunction = (_state, ownProps) => {
    const pickedOwnProps = pickOwnProps(propNames, ownProps)

    let mapFunction = makeOrMapFunction

    return state => {
      let result = mapFunction(state, pickedOwnProps)
      // Handle factory functions.
      if (typeof result === 'function') {
        mapFunction = result
        result = mapFunction(state, pickOwnProps)
      }
      return result
    }
  }

  return makeMapFunction
}

const makeKeyedOwnProps = (propNames, ConnectedComp) => {
  let key = 0
  let lastPropsKey
  let lastPickedOwnProps

  const ConnectOwnProps = props => {
    const pickedOwnProps = pickOwnProps(propNames, props)

    if (
      props.key !== lastPropsKey ||
      !shallowequal(pickedOwnProps, lastPickedOwnProps)
    ) {
      key++

      lastPropsKey = props.key
      lastPickedOwnProps = pickedOwnProps
    }

    return (
      <ConnectedComp {...props} key={key}>
        {props.children}
      </ConnectedComp>
    )
  }

  ConnectOwnProps.displayName = `ConnectOwnProps(${ConnectedComp.displayName})`

  ConnectOwnProps.propTypes = {
    children: PropTypes.node,
    key: PropTypes.any
  }

  return ConnectOwnProps
}

const makeConnectOwnProps = (
  propNames,
  makeMapStateToProps,
  makeMapDispatchToProps,
  mergeProps,
  options
) => Comp => {
  const ConnectedComp = connect(
    makeMapStateToProps,
    makeMapDispatchToProps,
    mergeProps,
    options
  )(Comp)

  const ConnectOwnProps = makeKeyedOwnProps(propNames, ConnectedComp)

  return ConnectOwnProps
}

const connectOwnProps = (
  propNames,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options
) => {
  const makeMapStateToProps = makeMakeMapFunction(propNames, mapStateToProps)
  const makeMapDispatchToProps = makeMakeMapFunction(
    propNames,
    mapDispatchToProps
  )

  const madeConnectOwnProps = makeConnectOwnProps(
    propNames,
    makeMapStateToProps,
    makeMapDispatchToProps,
    mergeProps,
    options
  )

  return madeConnectOwnProps
}

export {
  pickOwnProps,
  makeMakeMapFunction,
  makeKeyedOwnProps,
  makeConnectOwnProps
}

export default connectOwnProps

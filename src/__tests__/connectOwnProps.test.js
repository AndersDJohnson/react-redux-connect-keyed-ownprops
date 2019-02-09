import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import connectOwnProps, {
  pickOwnProps,
  makeMakeMapFunction,
  makeKeyedOwnProps,
  makeConnectOwnProps
} from '../connectOwnProps'

describe('pickOwnProps', () => {
  test('picks props', () => {
    const pickedOwnProps = pickOwnProps(['myProp'], { myProp: 1 })
    expect(pickedOwnProps).toEqual({
      myProp: 1
    })
  })

  test('ignores nonexistent props', () => {
    const pickedOwnProps = pickOwnProps(['myNonexistentProp'], { myProp: 1 })
    expect(pickedOwnProps).toEqual({})
  })

  test('works with single prop', () => {
    const pickedOwnProps = pickOwnProps('myProp', { myProp: 1 })
    expect(pickedOwnProps).toEqual({
      myProp: 1
    })
  })

  test('works with function', () => {
    const pickedOwnProps = pickOwnProps(({ myProp }) => ({ myProp }), {
      myProp: 1
    })
    expect(pickedOwnProps).toEqual({
      myProp: 1
    })
  })
})

describe('makeMakeMapFunction', () => {
  test('works', () => {
    const mapFunction = state => ({
      ...state,
      mappedProp: 1
    })

    const madeMakeMapFunction = makeMakeMapFunction(['myProp'], mapFunction)

    const wrappedMapFunction = madeMakeMapFunction(
      {},
      {
        myProp: 2,
        unusedProp: 3
      }
    )

    expect(
      wrappedMapFunction({
        existingProp: 4
      })
    ).toEqual({
      mappedProp: 1,
      existingProp: 4
    })
  })

  test('works with factory', () => {
    const makeMapFunction = jest.fn((state, pickedOwnProps) => {
      const selectOwnProp = () => 0

      return state => ({
        ...state,
        selectedOwnProp: selectOwnProp(state),
        mappedProp: 1
      })
    })

    const madeMakeMapFunction = makeMakeMapFunction(['myProp'], makeMapFunction)

    const wrappedMapFunction = madeMakeMapFunction(
      {
        myState: 1
      },
      {
        myProp: 2,
        unusedProp: 3
      }
    )

    expect(
      wrappedMapFunction({
        existingProp: 4
      })
    ).toEqual({
      mappedProp: 1,
      selectedOwnProp: 0,
      existingProp: 4
    })

    expect(
      wrappedMapFunction({
        existingProp: 5
      })
    ).toEqual({
      mappedProp: 1,
      selectedOwnProp: 0,
      existingProp: 5
    })

    expect(makeMapFunction).toHaveBeenCalledTimes(1)
  })
})

const Comp = ({ myProp }) => {
  return <div>{myProp}</div>
}

Comp.propTypes = {
  myProp: PropTypes.string
}

describe('makeKeyedOwnProps', () => {
  test('works', () => {
    const MadeKeyedtOwnProps = makeKeyedOwnProps(['myProp'], Comp)

    const wrapper = mount(<MadeKeyedtOwnProps myProp="myValue" />)

    const $Comp = () => wrapper.find(Comp)

    expect($Comp().key()).toEqual('1')

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ myProp: 'myValue' })

    expect($Comp().key()).toEqual('1')

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ myProp: 'myValue2' })

    expect($Comp().key()).toEqual('2')

    expect(wrapper).toMatchSnapshot()
  })
})

describe('makeConnectOwnProps', () => {
  it('works', () => {
    const madeConnectOwnProps = makeConnectOwnProps(['myProp'], () => ({}))

    const ConnectOwnProps = madeConnectOwnProps(Comp)

    const store = createStore(() => {})

    const wrapper = mount(
      <Provider store={store}>
        <ConnectOwnProps myProp="myValue" />
      </Provider>
    )

    const $Comp = () => wrapper.find('Connect(Comp)')

    expect($Comp().key()).toEqual('1')

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ children: <ConnectOwnProps myProp="myValue" /> })

    expect($Comp().key()).toEqual('1')

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ children: <ConnectOwnProps myProp="myValue2" /> })

    expect($Comp().key()).toEqual('2')

    expect(wrapper).toMatchSnapshot()
  })
})

describe('connectOwnProps', () => {
  it('works', () => {
    const MyComponent = connectOwnProps(['myProp'], () => ({}))(Comp)

    const store = createStore(() => {})

    const wrapper = mount(
      <Provider store={store}>
        <MyComponent myProp="myValue" />
      </Provider>
    )

    const $Comp = () => wrapper.find('Connect(Comp)')

    expect($Comp().key()).toEqual('1')

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ children: <MyComponent myProp="myValue" /> })

    expect($Comp().key()).toEqual('1')

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({ children: <MyComponent myProp="myValue2" /> })

    expect($Comp().key()).toEqual('2')

    expect(wrapper).toMatchSnapshot()
  })
})

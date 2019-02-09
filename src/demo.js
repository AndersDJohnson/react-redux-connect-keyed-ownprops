import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import connectOwnProps from '.'

let forceUpdate
let countMakeMapStateToProps = 0
let countMapStateToProps = 0

const store = createStore(
  (state, action) => ({
    ...state,
    myAction: action.payload
  }),
  {
    myAction: {}
  }
)

const dispatchAction = () => {
  console.log('Dispatching action')

  store.dispatch({
    type: 'MY_ACTION',
    payload: { value: Math.random() }
  })

  forceUpdate()
}

const Comp = ({ monitored, unmonitored }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>unmonitored prop value</td>
          <td>{unmonitored}</td>
        </tr>
        <tr>
          <td>monitored prop value</td>
          <td>{monitored}</td>
        </tr>
        <tr>
          <td>
            # <code>makeMapStateToProps</code> calls
          </td>
          <td>{countMakeMapStateToProps}</td>
        </tr>
        <tr>
          <td>
            # <code>mapStateToProps</code> calls
          </td>
          <td>{countMapStateToProps}</td>
        </tr>
      </tbody>
    </table>
  )
}

Comp.propTypes = {
  monitored: PropTypes.number,
  unmonitored: PropTypes.number
}

//

const makeMapStateToProps = () => {
  countMakeMapStateToProps++
  if (forceUpdate) forceUpdate()

  return state => {
    countMapStateToProps++

    if (forceUpdate) forceUpdate()

    return {
      myAction: state.myAction && state.myAction.value
    }
  }
}

const ConnectedComp = connectOwnProps('monitored', makeMapStateToProps)(Comp)

class App extends Component {
  static propTypes = {
    myProp: PropTypes.string
  }

  state = {
    monitored: 0,
    unmonitored: 0
  }

  constructor(props) {
    super(props)

    forceUpdate = this.forceUpdate.bind(this)
  }

  onSetStateMonitored = () =>
    this.setState(state => ({
      monitored: state.monitored + 1
    }))

  onSetStateUnmonitored = () =>
    this.setState(state => ({
      unmonitored: state.unmonitored + 1
    }))

  render() {
    const { monitored, unmonitored } = this.state

    return (
      <Provider store={store}>
        <table>
          <style>{`
            table {
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
            }
            td {
              padding: 8px;
            }
          `}</style>
          <tbody>
            <tr>
              <td>
                <button onClick={this.onSetStateUnmonitored}>
                  Increment unmonitored ownProp
                </button>
              </td>
              <td>
                This unmonitored <code>ownProp</code> will only update your
                custom component, without re-running{' '}
                <code>mapStateToProps</code> or <code>makeMapStateToProps</code>
                .
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={this.onSetStateMonitored}>
                  Increment monitored ownProp
                </button>
              </td>
              <td>
                This monitored <code>ownProp</code> will re-instantiate your
                component, causing <code>makeMapStateToProps</code> (and{' '}
                <code>mapStateToProps</code>) to re-run.
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={dispatchAction}>Dispatch Redux action</button>
              </td>
              <td>
                Dispatching will re-run <code>mapStateToProps</code> but not{' '}
                <code>makeMapStateToProps</code>.
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <ConnectedComp monitored={monitored} unmonitored={unmonitored} />
      </Provider>
    )
  }
}

//

const $app = document.createElement('div')
document.body.appendChild($app)
render(<App />, $app)

import {Component} from 'react'
import {EventEmitter} from 'fbemitter'
import {Provider} from 'unstated'

export default class extends Component {
  state = {
    store: []
  }

  componentDidMount () {
    if (!window.__NEXT_GLOBAL_STORE__) {
      window.__NEXT_GLOBAL_STORE__ = {}
    }
    if (!window.__NEXT_GLOBAL_EE__) {
      window.__NEXT_GLOBAL_EE__ = new EventEmitter()
      window.__NEXT_GLOBAL_EE__.addListener('update', this.update.bind(this))
    }
    this.update()
  }

  update () {
    this.setState({
      store: Object.keys(
        window.__NEXT_GLOBAL_STORE__
      ).reduce(
        (prev, curr) => ([...prev, window.__NEXT_GLOBAL_STORE__[curr]]),
        []
      )
    })
  }

  render () {
    return (
      <Provider inject={this.state.store}>
        {this.props.children}
      </Provider>
    )
  }
}

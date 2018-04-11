import {Component} from 'react'
import Link from 'next/link'
import {Subscribe} from 'unstated'
import Layout from '../components/Layout.js'
import CounterContainer from '../domains/Counter.js'

export default class extends Component {
  state = {}

  componentDidMount () {
    if (!window.__NEXT_GLOBAL_STORE__.CounterContainer) {
      window.__NEXT_GLOBAL_STORE__.CounterContainer = new CounterContainer()
      window.__NEXT_GLOBAL_EE__.emit('update')
    }
  }

  render () {
    return (
      <Layout>
        <Subscribe to={[CounterContainer]}>
          {counter => (
            <div>
              <button onClick={counter.decrement}>-</button>
              <span>{counter.state.count}</span>
              <button onClick={counter.increment}>+</button>
            </div>
          )}
        </Subscribe>
        <Link href="/about"><a>About</a></Link>
      </Layout>
    )
  }
}

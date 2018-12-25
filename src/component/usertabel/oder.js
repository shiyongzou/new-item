import React from 'react'
// import mirror, { actions, connect, render } from 'mirrorx'
import './index.scss'
import UserDeails from '../personaldeails/index'
class Oder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='user-deails'>
        <UserDeails />
      </div>)
  }
}
export default Oder

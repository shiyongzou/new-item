import React from 'react'
import { Carousel } from 'antd'
import './index.scss'
// import mirror, { actions, connect, render } from 'mirrorx'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        <Carousel
          effect='fade'
          autoplay
          dots
        >
          <div><div className='a' /></div>
          <div><div className='b' /></div>
          <div><div className='c' /></div>
          <div><div className='d' /></div>
        </Carousel>
      </div>)
  }
}
export default Home

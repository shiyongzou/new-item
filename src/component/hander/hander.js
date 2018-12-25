import React from 'react'
import '../../sass/hander.scss'
import { Avatar, Icon } from 'antd'
// import mirror, { actions, connect, render } from 'mirrorx'
import Home from '../home/home'
import About from '../about/about'
import Oder from '../usertabel/oder'
import Files from '../file/file'
import Me from '../me/me'
import Longin from '../login/longin'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Axios from 'axios'

class Hander extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      siLogin: true,
      longGinState: false, // 登录状态
      longGin: false // 登录框
    }
    this.longGinModel = this.longGinModel.bind(this) // 显示弹窗
    this.closeLongGin = this.closeLongGin.bind(this)// 关闭弹窗
    this.startHere = this.startHere.bind(this)// 登陆
    this.user = this.user.bind(this)// 用户名显示
    this.qiut = this.qiut.bind(this)// 退出登陆
    this.setClass = this.setClass.bind(this)// 退出登陆
  }
  componentDidMount () {
    Axios.get('http://localhost:8888/api').then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err.status)
    })
  }
  setClass (e) {
    // console.log(window.location)
    // if (e.target.getAttribute('href') === window.location.pathname) {
    //   e.target.style.backgroundColor = 'red'
    // }
  }
  longGinModel (code) {
    this.setState({ longGin: true, siLogin: code === 'dl' })
  }
  closeLongGin () {
    this.setState({ longGin: false })
  }
  qiut () {
    this.setState({
      longGinState: false
    })
  }
  startHere () {
    this.setState({
      longGinState: true
    })
  }
  user (name) {
    this.setState({
      userName: name
    })
  }
  render () {
    const { userName, longGinState, longGin, siLogin } = this.state
    return (
      <div className='worp'>
        <div className='banner'>
          <div className='logo'><Icon type='html5' theme='twoTone' style={{ fontSize: '50px', color: '#08c' }} /></div>
          <div className='users'>
            {longGinState
              ? <i>{userName}您好！</i>
              : <i>请登录</i>
            }
            <div className='userblock'>
              <Avatar className='userhand' shape='square' size='large' style={{ backgroundColor: '#87d068' }} icon='user' />
              {longGinState
                ? <ul className='select'>
                  <li>我的信息</li>
                  <li>修改密码</li>
                  <li onClick={this.qiut}>退出登录</li>
                </ul>
                : <ul className='select'>
                  <li onClick={() => this.longGinModel('dl')}>登陆</li>
                  <li onClick={() => this.longGinModel('zc')}>注册</li>
                </ul>
              }
            </div>
          </div>
        </div>
        <Router>
          <div className='hande'>
            <ul className='hand-tabs' onClick={(e) => this.setClass(e)}>
              <li><Link to='/'>首页</Link></li>
              <li><Link to='/about'>介绍</Link></li>
              <li><Link to='/oder'>用户信息列表</Link></li>
              <li><Link to='/file'>数据传输</Link></li>
              <li><Link to='/me'>关于我们</Link></li>
            </ul>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/oder' component={Oder} />
            <Route path='/file' component={Files} />
            <Route path='/me' component={Me} />
          </div>
        </Router>
        <Longin
          siLogin={siLogin}
          closeLongGin={this.closeLongGin}
          longGin={longGin}
          startHere={this.startHere}
          user={this.user}
        />
      </div>
    )
  }
}
export default Hander

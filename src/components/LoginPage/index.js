import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onLoginAction = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showErrorMsg, errorMsg} = this.state
    console.log(this.props)
    return (
      <div className="Login-page-con">
        <div className="card-con">
          <img
            className="login-card-heading-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-con" onSubmit={this.onLoginAction}>
            <label htmlFor="username" className="user-input-label">
              USERNAME
            </label>
            <input
              placeholder="Username"
              className="user-input"
              onChange={this.onChangeUsername}
              id="username"
              type="text"
            />
            <label className="user-input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              className="user-input"
              onChange={this.onChangePassword}
              id="password"
              type="password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showErrorMsg && <p className="login-error-mgs">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-container">
      <Link className="logo-btn" to="/">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="nav-items-con">
        <Link className="link-element" to="/">
          <p className="nav-items">Home</p>
        </Link>
        <Link className="link-element" to="/jobs">
          <p className="nav-items">Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Navbar)

import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class HomePage extends Component {
  render() {
    return (
      <div className="home-container">
        <Navbar />
        <div className="responsive-con">
          <div className="content-con">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-sub-heading">
              Millions of peoples are searching for
              jobs,salary,information,company reviews.find the that fits your
              abilities and potential.
            </p>
            <button type="button" className="find-job-btn">
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage

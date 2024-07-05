import {Component} from 'react'
import Cookies from 'js-cookie'
import {FiSearch} from 'react-icons/fi'
import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const eventState = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const employmentTypeValue = {
  FULLTIME: true,
  PARTTIME: false,
  FREELANCE: false,
  INTERNSHIP: false,
}

class JobPage extends Component {
  state = {
    profileDetails: '',
    jobs: [],
    profileFetched: eventState.loading,
    jobsFetched: eventState.loading,
    searchInput: '',
    employmentType: employmentTypeValue,
    minimumPackage: '',
    jobsApiUrl: 'https://apis.ccbp.in/jobs',
  }

  componentDidMount() {
    this.apiCallForProfile()
    this.apiCallForJobs()
  }

  apiCallForJobs = async () => {
    const {jobsApiUrl} = this.state
    try {
      const url = jobsApiUrl
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          'Content-type': 'Application / json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      const newData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobs: newData, jobsFetched: eventState.success})
    } catch (e) {
      this.setState({jobsFetched: eventState.failed})
      throw new Error(`failed to fetch: ${e.message}`)
    }
  }

  apiCallForProfile = async () => {
    try {
      const url = 'https://apis.ccbp.in/profile'
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          'Content-type': 'Application / json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(url, options)
      const data = await response.json()
      const newData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: newData,
        profileFetched: eventState.success,
      })
    } catch (e) {
      this.setState({profileFetched: eventState.failed})
      throw new Error(`Failed to fetch profile data: ${e.message}`)
    }
  }

  onChangeEmployment = event => {
    console.log(event.target.value)
    const {employmentType} = this.state
    let newValue = employmentType
    newValue.employmentType[event.target.value] = event.target.checked
    this.setState({employmentType: newValue})
    console.log(this.state.employmentType)
  }

  retryFetchingProfile = () => {
    this.setState({profileDetails: '', profileFetched: eventState.loading})
    this.apiCallForProfile()
  }

  renderProfile = () => {
    const {profileDetails, profileFetched} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    let content

    if (profileFetched === eventState.loading) {
      content = (
        <div className="btn-container">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      )
    } else if (profileFetched === eventState.success) {
      content = (
        <div className="btn-container">
          <div className="profile-con">
            <img className="profile-avathar" src={profileImageUrl} alt="alt" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-short-bio">{shortBio}</p>
          </div>
        </div>
      )
    } else if (profileFetched === eventState.failed) {
      content = (
        <div className="btn-container">
          <button
            type="button"
            className="profile-retry-btn"
            onClick={this.retryFetchingProfile}
          >
            Retry
          </button>
        </div>
      )
    } else {
      content = null
    }

    return content
  }

  renderCardItem = each => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = each
    return (
      <div className="job-card">
        <div className="job-card-header">
          <img
            className="job-card-logo"
            src={companyLogoUrl}
            alt={employmentType}
          />
          <div className="header-content">
            <h1 className="job-card-title">{title}</h1>
            <div className="job-card-rating-con">
              <FaStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-body">
          <div className="body-1">
            <div className="body-items">
              <IoLocation />
              <p className="body-item-text">{location}</p>
            </div>
            <div className="body-items">
              <BsBriefcaseFill />
              <p className="body-item-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-card-body-package-text">{packagePerAnnum}</p>
        </div>
        <div className="job-card-footer">
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    )
  }

  retryFetchingJobs = () => {
    this.setState({jobs: [], jobsFetched: eventState.loading})
    this.apiCallForJobs()
  }

  renderContentAsCondition = () => {
    const {jobsFetched, jobs} = this.state
    let content
    if (jobsFetched === eventState.loading) {
      content = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (jobsFetched === eventState.success) {
      content = (
        <>
          {jobs.map(each => (
            <>{this.renderCardItem(each)}</>
          ))}
        </>
      )
    } else if (jobsFetched === eventState.failed) {
      content = (
        <div className="jobs-failure-con">
          <img
            className="jobs-failure-img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
          <p className="jobs-failure-text">
            We cannot seem to find the page you looking for.
          </p>
          <button
            type="button"
            className="profile-retry-btn"
            onClick={this.retryFetchingJobs}
          >
            Retry
          </button>
        </div>
      )
    } else content = null
    return content
  }

  renderContent = () => (
    <>
      <div className="search-input-con">
        <input
          className="search-input-bar"
          type="search"
          placeholder="Search"
        />
        <div className="search-icon-con">
          <FiSearch className="search-icon" />
        </div>
      </div>
      <div className="job-cards-con">{this.renderContentAsCondition()}</div>
    </>
  )

  render() {
    const {employmentType} = this.state
    return (
      <div className="jobs-main-con">
        <Navbar />
        <div className="jobs-responsive-con">
          <div className="filters-con">
            <>{this.renderProfile()}</>
            <div className="employment-filter-con">
              <h1 className="employment-filter-heading">Type of Employment</h1>
              {employmentTypesList.map(each => {
                return (
                  <div key={each.employmentTypeId} className="label-con">
                    <input
                      id={each.employmentTypeId}
                      type="checkbox"
                      className="option"
                      value={each.employmentTypeId}
                      // checked={employmentType[each.employmentTypeId]}
                      onChange={this.onChangeEmployment}
                    />
                    <label
                      htmlFor={each.employmentTypeId}
                      className="checkbox-label"
                    >
                      {each.label}
                    </label>
                  </div>
                )
              })}
            </div>
            <div className="salary-filter-con">
              <h1 className="employment-filter-heading">Salary Range</h1>
              {salaryRangesList.map(each => (
                <div key={each.salaryRangeId} className="label-con">
                  <input
                    type="radio"
                    value={each.salaryRangeId}
                    className="option"
                    name="salary"
                  />
                  <label
                    htmlFor={each.salaryRangeId}
                    className="checkbox-label"
                  >
                    {each.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="content-con">{this.renderContent()}</div>
        </div>
      </div>
    )
  }
}

export default JobPage

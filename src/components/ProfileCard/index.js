import './index.css'

import Loader from 'react-loader-spinner'

const ProfileCard = props => {
  const {profileDetails, profileFetched, eventState} = props
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

export default ProfileCard

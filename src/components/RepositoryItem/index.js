import './index.css'

const RepositoryItem = props => {
  const {eachRepository} = props
  //   console.log(eachRepository)
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = eachRepository

  return (
    <li className="item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name-heading">{name}</h1>
      <div className="details-container">
        <div className="flex-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="logo"
          />
          <p className="counts-text">{starsCount}stars</p>
        </div>
        <div className="flex-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="logo"
          />
          <p className="counts-text">{forksCount}forks</p>
        </div>
        <div className="flex-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="logo"
          />
          <p className="counts-text">{issuesCount}issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem

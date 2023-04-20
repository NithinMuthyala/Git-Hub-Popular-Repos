import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    activeReposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguage} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const formattedRepos = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        activeReposList: formattedRepos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLanguage = id => {
    this.setState({activeLanguage: id}, this.getRepos)
  }

  failureRepositary = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>SomeThing Went Wrong</h1>
    </div>
  )

  successRepositary = () => {
    const {activeReposList} = this.state
    // console.log(activeReposList)
    return (
      <ul className="repositaries-container">
        {activeReposList.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            eachRepository={eachRepository}
          />
        ))}
      </ul>
    )
  }

  loadingProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositiries = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.failureRepositary()
      case apiStatusConstants.success:
        return this.successRepositary()
      case apiStatusConstants.inProgress:
        return this.loadingProgress()
      default:
        return null
    }
  }

  render() {
    const {activeLanguage} = this.state
    return (
      <div className="app-container">
        <div className="main-card-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="filter-options-container">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                key={eachFilter.id}
                eachFilter={eachFilter}
                onClickLanguage={this.onClickLanguage}
                activeLanguage={activeLanguage}
              />
            ))}
          </ul>
          {this.renderRepositiries()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos

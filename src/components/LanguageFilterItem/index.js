import './index.css'

const LanguageFilterItem = props => {
  const {eachFilter, onClickLanguage, activeLanguage} = props
  const {id, language} = eachFilter
  const languageSelected = () => {
    onClickLanguage(id)
  }
  const btnActiveCls = activeLanguage === id ? 'btn-class' : 'language-btn'

  return (
    <li className="language-list-item">
      <button type="button" className={btnActiveCls} onClick={languageSelected}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

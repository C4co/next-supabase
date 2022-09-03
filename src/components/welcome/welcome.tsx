import { useTranslation } from 'react-i18next'

export function Welcome() {
  const { t, i18n } = useTranslation()

  function ptbr() {
    i18n.changeLanguage('pt_BR')
  }

  function en() {
    i18n.changeLanguage('en')
  }

  const description = t('description')

  return (
    <div data-testid="welcome">
      <h1 data-testid="title"> CN Next starter </h1>
      <p data-testid="description"> {description} </p>
      <span data-testid="version"> {process.env.NEXT_PUBLIC_VERSION} </span>

      <br />

      <div>
        <button onClick={ptbr}> pt_BR </button>
        <button onClick={en}> en </button>
      </div>
    </div>
  )
}

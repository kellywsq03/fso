import { useState, useEffect } from 'react'
import countryService from './services/countries'

const CountryName = ({country}) => <p>{country["name"]["common"]}</p> 
const LanguageName = ({languages, languageKey }) => <li>{languages[languageKey]}</li> 

const Languages = ({ languages }) => {
  if (languages === null) {
    return null
  }

  const languageKeys = Object.keys(languages)
  return (
    languageKeys.map(key => <ul><LanguageName languages={languages} key={key} languageKey={key} /></ul> )
  )
  
}

const CountryList = ({countries}) => {
  if (countries === null) {
    console.log("no countries")
    return null
  }

  else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  else if (countries.length === 1) {
    const targetCountry = countries[0]
    return (
      <>
        <h1>{targetCountry["name"]["common"]}</h1>
        <p>capital {targetCountry.capital}</p>
        <p>area {targetCountry.area} </p>
        <h2>languages: </h2>
        <Languages languages={targetCountry.languages} />
        <img src={targetCountry.flags.png} alt="country flag"></img>>
      </>
    )
  }

  else {
    return (
      countries.map(country => 
        <CountryName key={country["name"]["common"]} country={country}/>
      )
    )
  }
  
}

const App = () => {
  const [searchCountries, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    if (searchCountries) {
      console.log("getting countries...")
      countryService
      .search(searchCountries)
      .then(returnedCountries => {
        setCountries(returnedCountries)
        returnedCountries.forEach(country => console.log(country.name.common))
      })
      .catch(error => {
        console.log("error")
        setCountries(null)
      })
    }
  }, [searchCountries])

  const handleCountryChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <p>find countries <input value={searchCountries} onChange={handleCountryChange}></input></p><br></br>
      <div>
        <CountryList countries={countries} />
      </div>
    </div>
  )
}

export default App
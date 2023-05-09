import { useState, useEffect } from 'react'
import countryService from './services/countries'

const CountryName = ({country, showCountry}) => {
  return (
    <p>
      {country["name"]["common"]} <button type="submit" onClick={() => showCountry(country)}>show</button>
    </p>
  )
}
const LanguageName = ({languages, languageKey }) => <li>{languages[languageKey]}</li> 

const CountryData = (countryData) => {
  const targetCountry = countryData.countryData

  return (
    <>
      <h1>{targetCountry["name"]["common"]}</h1>
      <p>capital {targetCountry.capital}</p>
      <p>area {targetCountry.area} </p>
      <h2>languages: </h2>
      <Languages languages={targetCountry.languages} />
      <img src={targetCountry.flags.png} alt="country flag"></img>
    </>
  )
}

const Languages = ({ languages }) => {

  if (languages === null) {
    return null
  }

  const languageKeys = Object.keys(languages)

  return (
    languageKeys.map((language) => <ul><LanguageName key={language} languages={languages} languageKey={language} /></ul> )
  )
  
}

const CountryList = ({ countries, showCountry }) => {

  console.log(countries)

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
    console.log(countries)
    const targetCountry = countries[0]
    return (
      <>
        <CountryData countryData={targetCountry} />
      </>
    )
  }

  else {
    return (
      countries.map(country => 
        <CountryName key={country["name"]["common"]} country={country} showCountry={showCountry} />
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

  const showCountry = ( country ) => {
    console.log("show")
    console.log("target country", country)
    setCountries([country])
    // const targetCountry = countries.find(element => element.name.common === country.name.common)
    // return (
    //   <>
    //     <CountryData countryData={targetCountry} />
    //   </>
    // )
  }

  return (
    <div>
      <p>find countries <input value={searchCountries} onChange={handleCountryChange}></input></p><br></br>
      <div>
        <CountryList countries={countries} showCountry={showCountry} />
      </div>
    </div>
  )
}

export default App
import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1'

const search = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const countryService = {search}

export default countryService
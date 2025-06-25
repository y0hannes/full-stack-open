import { useEffect, useState } from "react"
import Services from "./components/Services"
import Input from "./components/Input"
import Content from "./components/Content"

const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilterCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Services.getAll()
      .then((countries) => {
        setAllCountries(countries)
      })
      .catch((error) => {
        console.error("Failed to fetch countries:", error)
      })
  }, [])

  const handleInput = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim().length === 0) {
      setFilterCountries([])
      return
    }
    
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )

    setFilterCountries(filtered)
  }

  const handleShow = (country) => {
    setFilterCountries([country])
  }

  return (
    <>
      <Input value={searchQuery} onChange={handleInput} />
      <Content countries={filteredCountries} onShow={handleShow} />
    </>
  )
}

export default App
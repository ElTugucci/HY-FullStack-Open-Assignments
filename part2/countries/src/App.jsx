import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Results from "./components/Results";
import Country from "./components/Country";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const showResults = (search) => {
    if (search === "") {
      setResults(null);
    } else {
      const r = countries.filter((c) => {
        return c.name.common.toLowerCase().includes(search.toLowerCase());
      });
      setResults(r);
    }
  };
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    showResults(event.target.value);
  };

  useEffect(() => {
    countryService
      .getAll()
      .then((allCountries) => {
        setCountries(allCountries);
      })
      .catch((error) => {
        console.error("failed to load contries", error);
      });
  }, []);

  useEffect(() => {
    if (results !== null && results.length === 1) {
      setCountry(results[0]);
    } else {
      setCountry(null);
    }
  }, [results]);

  return (
    <>
      <div>
        find countries
        <input value={search} onChange={handleSearchChange}></input>
      </div>
      <div>
        <Results results={results} setCountry={setCountry} />
      </div>
      <div>
        <Country country={country} />
      </div>
    </>
  );
}

export default App;

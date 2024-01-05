import Weather from "./Weather";
const Country = ({ country }) => {
  if (country === null) {
    return null;
  }
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>
        <div>
          languages:
          <ul>
            {Object.values(country.languages).map((val) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={country.flags.png}></img>
        </div>
        <Weather capital={country.capital} />
      </div>
    </>
  );
};
export default Country;

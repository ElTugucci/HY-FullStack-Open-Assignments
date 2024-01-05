const Results = ({ results, setCountry }) => {
  if (results === null || results.length === 1) {
    return null;
  }
  if (results.length >= 10) {
    return <>too many matches, specify another filter</>;
  } else {
    return (
      <ul>
        {results.map((c) => (
          <li key={c.name.common}>
            {c.name.common} <button onClick={() => setCountry(c)}>show</button>
          </li>
        ))}
      </ul>
    );
  }
};
export default Results;

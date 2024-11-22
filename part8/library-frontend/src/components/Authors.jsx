import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import { useState } from "react"
import { useEffect } from "react"
import EditAuthor from "./EditAuthor"

const Authors = ({ show, token }) => {
  const [authors, setAuthors] = useState([])
  const { data, loading, error } = useQuery(ALL_AUTHORS)
  useEffect(() => {
    if (data) {
      console.log(data);
      setAuthors(data.allAuthors)
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? (<EditAuthor authors={authors} />) : (null)}
    </div>
  )
}

export default Authors

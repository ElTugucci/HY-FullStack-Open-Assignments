import { useState } from 'react'
import { useEffect } from "react";
import { ALL_BOOKS, } from '../queries'
import { useQuery } from "@apollo/client"
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from '../queries';

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title // Changed from item.name to item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    if (allBooks) {
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook))
      }
    }
    return { allBooks: [addedBook] }
  })
}

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genreFilter, setGenreFilter] = useState('')

  const { data, error, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(`${addedBook.title} added`)



      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: "" } }, ({ allBooks }) => {
        if (allBooks) {
          return {
            allBooks: allBooks.concat(addedBook)
          }
        }
        return null
      })
    }
  });

  useEffect(() => {
    if (data && !genreFilter) {
      const allGenres = data.allBooks.flatMap(book => book.genres); // Flatten genres
      const uniqueGenres = [...new Set(allGenres)]; // Remove duplicates
      setGenres(uniqueGenres); // Update state with the flattened genres
    }
  }, [data])

  const chooseGenre = (genre) => {
    console.log('filtering by ', genre)
    setGenreFilter(genre)
  }

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error: {error.message}</p>

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => chooseGenre(g)}>{g}</button>
      ))}
      <button key='all' onClick={() => chooseGenre('')}>all genres</button>
    </div>
  )
}

export default Books

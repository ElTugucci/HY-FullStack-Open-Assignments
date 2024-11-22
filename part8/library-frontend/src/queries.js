import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query{
    allAuthors
    {name
    born
    bookCount
    }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String){
  allBooks(genre: $genre) {
  title
  author
  {name}
  published
  genres
  }
}
`

export const GET_ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`


export const ADD_BOOK = gql`
mutation addBook(
    $title: String!,
    $author: String!,
    $published: Int!, 
    $genres: [String]){
    addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
    ){
    title
  author
  {name}
  published
  genres
    }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
   title
  author
  {name}
  published
  genres 
    }
  }
  `

export const EDIT_BIRTH_YEAR = gql` 
mutation editAuthor($name: String!, $setBornTo: Int!)
{
    editAuthor(name: $name, setBornTo: $setBornTo){
        name   
        born 
    }
}
`
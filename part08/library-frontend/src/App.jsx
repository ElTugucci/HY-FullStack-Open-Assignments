import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LogInForm";
import { useApolloClient } from "@apollo/client";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, []);

  const logOut = () => {
    setToken(null);
    client.resetStore();
    localStorage.clear();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logOut}>logout</button>
            <button onClick={() => setPage("reccomendations")}>recommendations</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommendations token={token} show={page === "reccomendations"} />
      <LoginForm setToken={setToken} setPage={setPage} show={page === "login"} />
    </div>
  );
};

export default App;
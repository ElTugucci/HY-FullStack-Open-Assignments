import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import AddForm from "./components/AddForm";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  //state variables
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [errorMessage, SetErrorMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const filteredBook = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  //get the data
  useEffect(() => {
    personService.getAll().then((initial) => {
      setPersons(initial.data);
    });
  }, []);

  //functions
  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${personObject.name} is already in the phonebook, would you like to replace the number?`
        )
      ) {
        const person = persons.find((p) => p.name === personObject.name);
        personService
          .update(person.id, personObject)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : response.data))
            );
            setNotification(`${person.name}'s number is changed`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data.error);
            SetErrorMessage(error.response.data.error);
            setTimeout(() => {
              SetErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response));
          setNotification(`${personObject.name} is added`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          SetErrorMessage(error.response.data.error);
          setTimeout(() => {
            SetErrorMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (person) => {
    const id = person.id;
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          SetErrorMessage(`${error}the ${person.name} is already deleted`);
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => {
            SetErrorMessage(null);
          }, 5000);
        });
    }
  };
  //event handlers
  const handleAddName = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <br></br>
      <h2>Add new</h2>
      <AddForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      {filteredBook.map((person) => (
        <Person
          key={person.name}
          person={person}
          remove={() => removePerson(person)}
        />
      ))}
    </div>
  );
};

export default App;

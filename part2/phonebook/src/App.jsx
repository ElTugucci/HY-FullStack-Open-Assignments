import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Person from "./components/Person";
import AddForm from "./components/AddForm";
// component

const App = () => {
  const [persons, setPersons] = useState([]);
  //get the data//get the data//get the data//get the data//get the data//get the data//get the data
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  //state variables
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const filteredBook = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  //function
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;

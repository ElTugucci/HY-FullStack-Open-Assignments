import { useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import AddForm from "./components/AddForm";
// component

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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

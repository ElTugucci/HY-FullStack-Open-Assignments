const AddForm = ({
  addPerson,
  newName,
  newNumber,
  handleAddName,
  handleAddNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleAddName} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleAddNumber} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
export default AddForm;

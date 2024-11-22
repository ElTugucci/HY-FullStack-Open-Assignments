import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from "../queries"
import Select from "react-select"

const EditAuthor = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const options = authors.map(author => ({
        value: author.name,  // Unique value (you can use the name or an ID)
        label: author.name   // Label to display in the dropdown
    }));

    const [editAuthor] = useMutation(EDIT_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages);
        }
    })

    const submit = (event) => {
        event.preventDefault()
        editAuthor({ variables: { name, setBornTo: parseInt(born) } })
        setName('')
        setBorn('')
    }

    const handleSelectChange = (selectedOption) => {
        setName(selectedOption ? selectedOption.value : ''); // Update name with the selected author's name
    }

    return (
        <><h2>edit author</h2><form onSubmit={submit}>
            <div>
                author name
                <Select options={options}
                    value={options.find(option => option.value === name)}
                    onChange={handleSelectChange} />
            </div>
            <div>
                set birth date

                <input value={born}
                    type="number"
                    onChange={({ target }) => setBorn(target.value)} />
            </div>
            <button type="submit">change</button>
        </form>

        </>
    )
}

export default EditAuthor
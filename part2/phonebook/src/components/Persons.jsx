import Person from "./Person"

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      <ul>
        {
          persons.map((person, index) => (
            <Person key={index} person={person} onClick={handleDelete}/>
          ))
        }
      </ul>
    </>
  )
}
export default Persons
const Person = ({ person, onClick}) => {
  return (
    <li> {person.name} {person.number} <button onClick={() => onClick(person.id, person.name)}>Delete</button></li>
  )

}

export default Person
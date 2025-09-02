import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispach = useDispatch()

  const handleFilterChange = async (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispach(filterChange(filter))
  }
  return (
    <input
      type="text"
      placeholder="type key word"
      onChange={handleFilterChange}
    />
  )
}

export default Filter
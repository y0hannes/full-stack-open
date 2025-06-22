const Filter = ({value, onChange}) => {
  return (
    <>
      Filter search with: <input type="text" value={value} onChange={onChange} />
    </>
  )
}

export default Filter
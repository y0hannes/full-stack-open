const Input = ({ value, onChange }) => {
  return (
    <>
      find countries: <input value={value} type="text" onChange={onChange} />
    </>
  )
}

export default Input
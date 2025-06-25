const Countries = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <div>{country.name.common}</div>
      ))}
    </>
  )
}

export default Countries
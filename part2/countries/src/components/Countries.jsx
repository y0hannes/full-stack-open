const Countries = ({ countries, onClick }) => {
  return (
    <>
      {countries.map((country) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}
            <button
              onClick={() => onClick(country)}>
              Show</button>
          </p >
        </div>
      ))}
    </>
  )
}

export default Countries
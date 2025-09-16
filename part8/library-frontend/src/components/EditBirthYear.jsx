import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const EditBirthYear = () => {
  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  
  const response = useQuery(ALL_AUTHORS);
  if (response.loading) {
    return <div>loading authors...</div>;
  }
  
  const authors = response.data.allAuthors;
  
  const [name, setName] = useState(authors[0]?.name || '');
  const [birthYear, setBirthYear] = useState('');
  
  const onSubmit = async (event) => {
    event.preventDefault();
    changeBirthYear({
      variables: {
        name,
        setBornTo: Number(birthYear),
      },
    });
    setName('');
    setBirthYear('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name
        <select value={name} onChange={(event) => setName(event.target.value)}>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        born
        <input
          type='text'
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
      </div>
      <button type='submit'>update author</button>
    </form>
  );
};

export default EditBirthYear;

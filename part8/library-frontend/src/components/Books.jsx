import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const { data: allBooksData, loading: allBooksLoading } = useQuery(ALL_BOOKS);
  const { data: filteredData, loading: filteredLoading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  if (!props.show) {
    return null;
  }

  if (allBooksLoading || filteredLoading) {
    return <div>loading...</div>;
  }

  const books = genre ? filteredData.allBooks : allBooksData.allBooks;

  const genres = allBooksData
    ? [...new Set(allBooksData.allBooks.flatMap((b) => b.genres))]
    : [];

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre || 'all'}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;

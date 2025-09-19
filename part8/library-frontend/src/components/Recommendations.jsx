import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommendations = (props) => {
  const { data: meData, loading: meLoading } = useQuery(ME);

  const favoriteGenre = meData?.me?.favoriteGenre;

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (!props.show) {
    return null;
  }

  if (meLoading || booksLoading) {
    return <div>loading...</div>;
  }

  const books = booksData?.allBooks || [];

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
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
    </div>
  );
};

export default Recommendations;

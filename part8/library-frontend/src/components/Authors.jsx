import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import EditBirthYear from './EditBirthYear';

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const response = useQuery(ALL_AUTHORS);

  if (response.loading) {
    return <div>loading...</div>;
  }

  const authors = response.data.allAuthors;

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <EditBirthYear />
      </div>
    </div>
  );
};

export default Authors;

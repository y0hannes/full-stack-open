import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token')
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
  };

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        client={client}
      />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommend'} />
    </div>
  );
};

export default App;
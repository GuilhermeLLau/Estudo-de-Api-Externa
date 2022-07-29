import React from 'react';
import './App.css';
import Input from './Components/Input/Input';
import ViewList from './Components/List/ViewList';

const api = 'https://kitsu.io/api/edge/';

function App() {
  const [info, setInfo] = React.useState({});
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (text) {
      setInfo({});
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [text]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <Input value={text} onChange={(search) => setText(search)} />
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      <ViewList></ViewList>
    </div>
  );
}

export default App;

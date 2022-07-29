import React from 'react';
import Input from '../Input/Input';

const api = 'https://kitsu.io/api/edge/';

const ViewList = () => {
  const [info, setInfo] = React.useState({});
  const [text, setText] = React.useState('');

  function useHandleChange() {
    if (text) {
      setInfo({});
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }

  return (
    <div>
      <Input value={text} onChange={(search) => setText(search)} />
      <button type="submit" onClick={useHandleChange}>
        Buscar
      </button>
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
    </div>
  );
};

export default ViewList;

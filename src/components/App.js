import '../styles/App.scss';
import phrasesList from '../data/quotes.json';
import { useState } from 'react';
// import callToApi from '../services/api';

// import ls from '../services/localStorage';

function App() {
  const [data, setData] = useState(phrasesList);
  const [phraseFilter, setPhraseFilter] = useState('');
  const [characterFilter, setCharacterFilter] = useState('');
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });

  const handleSearch = (ev) => {
    setPhraseFilter(ev.target.value);
  };

  const handleNewPhrase = (ev) => {
    setNewPhrase({
      ...newPhrase,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleSearchCharacter = (ev) => {
    setCharacterFilter(ev.target.value);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newPhrase]);
    setNewPhrase({
      quote: '',
      character: '',
    });
  };

  const htmlData = data
    .filter(
      (phrase) =>
        phrase.quote
          .toLocaleLowerCase()
          .includes(phraseFilter.toLocaleLowerCase())
      //     characterFilter
      //       .toLocaleLowerCase()
      //       .includes(phrase.character.toLocaleLowerCase())
    )

    // (characterFilter === 'all' ||
    //     phrase.character
    //       .toLocaleLowerCase()
    //       .includes(characterFilter.toLocaleLowerCase()))

    .map((phrase, i) => {
      return (
        <li key={i}>
          <p>
            {phrase.quote}
            {phrase.character}
          </p>
        </li>
      );
    });

  return (
    <div>
      <header>
        <h1>Frases de Friends</h1>
      </header>
      <main>
        <nav>
          <form action="submit">
            {/* phrase filter */}
            <label htmlFor="phraseFilter">Filtrar por frase: </label>
            <input
              type="search"
              name="phraseFilter"
              id="phraseFilter"
              value={phraseFilter}
              onChange={handleSearch}
            />
            {/* character filter */}
            <label htmlFor="characterFilter">Filtrar por personaje: </label>
            <select
              type="search"
              name="characterFilter"
              id="characterFilter"
              value={characterFilter}
              onChange={handleSearchCharacter}
            >
              <option value="all">Todos</option>
              <option value="ross">Ross</option>
              <option value="monica">Monica</option>
              <option value="joey">Joey</option>
              <option value="phoebe">Phoebe</option>
              <option value="chandler">Chandler</option>
              <option value="rachel">Rachel</option>
            </select>
          </form>
        </nav>
        {/* list of phrases */}
        <ul>{htmlData}</ul>
        {/* add new phrase */}
        <form action="submit">
          <h2>Añadir una nueva frase</h2>
          <label htmlFor="quote">Frase</label>
          <input
            type="text"
            name="quote"
            id="quote"
            value={newPhrase.quote}
            onChange={handleNewPhrase}
          />
          <label htmlFor="character">Personaje</label>
          <input
            type="text"
            name="character"
            id="character"
            value={newPhrase.character}
            onChange={handleNewPhrase}
          />
          <input
            type="submit"
            value="Añadir una nueva frase"
            onClick={handleClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;

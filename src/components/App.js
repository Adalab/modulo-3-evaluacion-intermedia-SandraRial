import '../styles/App.scss';
import getDataApi from '../services/api';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [phraseFilter, setPhraseFilter] = useState('');
  const [characterFilter, setCharacterFilter] = useState('all');
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });

  useEffect(() => {
    if (data.length === 0) {
      getDataApi().then((datafromAPI) => {
        setData(datafromAPI);
      });
    }
  }, [data]);

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
    console.log(characterFilter);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    if (newPhrase.quote === '' || newPhrase.character === '') {
      alert('Rellena todos los campos');
    } else {
      setData([...data, newPhrase]);
      setNewPhrase({
        quote: '',
        character: '',
      });
    }
  };

  const htmlData = data
    .filter((phrase) => {
      if (characterFilter === 'all') {
        return true;
      } else if (characterFilter === phrase.character) {
        return true;
      } else {
        return false;
      }
    })

    .filter((phrase) =>
      phrase.quote.toLowerCase().includes(phraseFilter.toLowerCase())
    )

    .map((phrase, i) => {
      return (
        <li key={i} className="list__liItem">
          <p>
            {phrase.quote}~{phrase.character}
          </p>
        </li>
      );
    });

  return (
    <div>
      <header>
        <h1 className="title"> ~ Frases de Friends ~</h1>
      </header>
      <main>
        <nav>
          <form action="submit" className="nav">
            <div className="nav__flPhrase">
              {/* phrase filter */}
              <label htmlFor="phraseFilter">Filtrar por frase: </label>
              <input
                type="search"
                name="phraseFilter"
                id="phraseFilter"
                value={phraseFilter}
                onChange={handleSearch}
              />
            </div>
            <div className="nav__flCharacter">
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
                <option value="Ross">Ross</option>
                <option value="Monica">Monica</option>
                <option value="Joey">Joey</option>
                <option value="Phoebe">Phoebe</option>
                <option value="Chandler">Chandler</option>
                <option value="Rachel">Rachel</option>
              </select>
            </div>
          </form>
        </nav>
        {/* list of phrases */}
        <ul className="list">{htmlData}</ul>
        {/* add new phrase */}
        <form action="submit">
          <h2 className="title_2">~ Añadir una nueva frase ~</h2>
          <div className="add">
            <div className="add__phrase">
              <label htmlFor="quote">Frase: </label>
              <input
                type="text"
                name="quote"
                id="quote"
                value={newPhrase.quote}
                onChange={handleNewPhrase}
              />
            </div>
            <div className="add__character">
              <label htmlFor="character">Personaje: </label>
              <input
                type="text"
                name="character"
                id="character"
                value={newPhrase.character}
                onChange={handleNewPhrase}
              />
              <input
                className="add__btn"
                type="submit"
                value="Añadir una nueva frase"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;

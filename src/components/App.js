import '../styles/App.scss';
import phrasesList from '../data/quotes.json';
import { useState } from 'react';
// import callToApi from '../services/api';

// import ls from '../services/localStorage';

function App() {
  const [data, setData] = useState(phrasesList);
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });

  const handleNewPhrase = (ev) => {
    setNewPhrase({
      ...newPhrase,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newPhrase]);
    setNewPhrase({
      quote: '',
      character: '',
    });
  };

  const htmlData = data.map((phrase, i) => {
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
        {/* list of phrases */}
        <ul>{htmlData}</ul>
        {/* add new phrase */}
        <form action="">
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

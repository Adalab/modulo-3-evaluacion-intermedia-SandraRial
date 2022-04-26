import '../styles/App.scss';
import phrasesList from '../data/quotes.json';
import { useState } from 'react';
// import callToApi from '../services/api';

// import ls from '../services/localStorage';

function App() {
  const [data, setData] = useState(phrasesList);

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
      </main>
    </div>
  );
}

export default App;

import { useRef, useState } from 'react'
import './App.css';
import Header from './components/Header';
import UserState from "./context/user/UserState";
import CountryState from './context/country/CountryState';
import CountryList from './components/CountryList';


export default function App() {

  const initGames = [
    {
      "id": 1,
      "name": "Fifa 2022",
      "price": 60
    },
    {
      "id": 2,
      "name": "Fornite Skills",
      "price": 30
    },
  ];

  const [games, setGames] = useState(initGames);
  const [lola, setlola] = useState('');
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();

  const filteredGames = games.filter(e => e.name.toLowerCase().includes(lola.toLowerCase()));

  const addNewGame = (e) => {
    e.preventDefault();
    console.log("add new game");

    //Handle error: if the game exists, you must show a error.
    if (
      games.some(e => e.name.toLowerCase() === nameRef.current.value.toLowerCase())
    ) {
      setError(true);
      return false;
    }

    const newGame = {
      "id": games.length + 1,
      "name": nameRef.current.value,
      "price": priceRef.current.value,
    }

    setGames([...games, newGame]);
    setError(false);

  }

  const deleteGame = (id) => {
    const newGamesList = games.filter(e => e.id != id);
    setGames(newGamesList)
  }
  return (
    <>
      <UserState>
        <Header />
      </UserState>

      <CountryState>
        <CountryList />
        
      </CountryState>

      <main>
        <section>
          <form onSubmit={addNewGame}>
            <div className="filter-container">
              <input type="text" name='name' placeholder='Name game' ref={nameRef} />
              <input type="number" name='price' placeholder='Price game' ref={priceRef} />
              <button type='submit'>Add</button>
            </div>
          </form>
        </section>

        <section>
          <div className='search-container'>
            <input type="text" value={lola} name="search" placeholder='search game' onChange={(e) => { setlola(e.target.value) }} />
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredGames.map(e =>
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.price}€</td>
                    <td><button onClick={() => { deleteGame(e.id) }}>Borrar</button></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </section>

        {
          error && <div className='error'>Juego repetido</div>
        }


      </main>

    </>

  )
}
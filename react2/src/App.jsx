import './assets/complements/Card.css'
import {data} from './assets/data/data.js'
import Card from './assets/complements/Card.jsx'
import Header from './assets/complements/Header.jsx'
import './App.css'

function App() {

  return (
      <div id="root">
        <Header/>
        <main>
        {data.map( shoe => (
          <Card key={shoe.id}
            name={shoe.name}
            price={shoe.price}
            description={shoe.description}
            stock={shoe.stock}
            newCollection={shoe.newCollection}
            imgs={shoe.imgs}
          />
        ))}
        </main>
      </div>
  )
}

export default App

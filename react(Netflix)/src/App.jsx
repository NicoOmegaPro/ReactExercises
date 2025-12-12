import { seriesList } from './data/series-static.js'
import Card from './assets/components/Card.jsx';
import Container from './assets/components/Container.jsx';
import './css/styles.css';
import './css/card.css';


export default function App() {

  return (
    <div className="grid-similares">
    {seriesList.map(serie => (
        <Card key={serie.id}>
            <div className="season">
              {serie.seasons? serie.seasons >1 ? serie.seasons + " Temporadas" : serie.seasons +" Temporada": 
              serie.episodes? serie.episodes>1 ? serie.episodes + " Episodios" : serie.episodes + " Episodio" : 
              serie.type ? serie.type=="miniserie" ? " Miniserie" : serie.type : ""}
            </div>
                <img src={"./public/img/"+serie.img} alt={serie.title}/>
                <Container
                  stars={serie.stars}
                  year={serie.year}
                  pegi={serie.pegi}
                  matching={serie.matching}
                  desc={serie.desc}
                />
          </Card>
        )
      )
    }
    </div>
  )
}
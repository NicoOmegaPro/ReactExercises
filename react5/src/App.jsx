import { useState, useEffect, use } from 'react'
import Loading from './components/Loading.jsx'
import ToursList from './components/ToursList.jsx'
import NoTours from './components/NoTours.jsx'

export default function App() {
  // TODO: Set state loading and tours
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  

  // TODO: Remove Tour by id and set the new state 
  function removeTour(id) {
    setTours(tours.filter(tour => tour.id !== id));

  }

  // TODO: Get Tours data from json 
  async function fetchTours(){
    const url ="/public/data/data.json"
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTours()
  }, []);

  return (
    <main>
      {loading ? <Loading/>:tours.length==0?<NoTours refresh={fetchTours}/>:<ToursList tours={tours} removeTour={removeTour}/>}
    </main>
  )
}

import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import TableCoins from "./components/TableCoins";

export default function App(){
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function getData(){
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      //"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      //"/data/coins.json" 
      //el axios se puede hacer tanto con json de publix como con url de la api, las apis al ser tantos puede fallar.
      setCoins(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect (() => {
    getData();
  },[]);

   const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  return(
    loading?<Loading/>:
      <div className="container">
        <div className="row">
        	<input 
            type="text"
            placeholder="Search a Coin"
            className="form-control bg-dark text-light border-0 mt-4 text-center"
            autoFocus
            onChange = {(e) => setSearch(e.target.value)}
           />
          <TableCoins coins={filteredCoins}/>
        </div>
      </div>
  )
}

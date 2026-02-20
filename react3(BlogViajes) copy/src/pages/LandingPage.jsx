import Sidebar from "/src/assets/complements/Slidebar.jsx";
import Entrada from "/src/assets/complements/Entrada.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await axios.get("/src/data/articles.json");
      //"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      //"/data/coins.json"
      //el axios se puede hacer tanto con json de publix como con url de la api, las apis al ser tantos puede fallar.
      setArticles(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="main-container">
      <section className="articulos">
        <section className="articulos">
          {articles.map((article) => (
            <Entrada
              key={article.id}
              img={article.img}
              title={article.title}
              desc={article.desc}
            />
          ))}
        </section>
      </section>
      <Sidebar />
    </main>
  );
}

// {articles.map( article => (
//                   <Entrada key={article.id}
//                     img={article.img}
//                     title={article.title}
//                     desc={article.desc}
//                   />
//                 ))}
//Usando mapo leyendo el json, se le asigna a cada entrada su id, img, title y desc.

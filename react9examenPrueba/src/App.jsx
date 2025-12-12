import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import "./assets/css/styles.css";
import Footer from "./assets/componnetes/footer.jsx";
import Card from "./assets/componnetes/card.jsx";
import Banner from "./assets/componnetes/banner.jsx";
import Header from "./assets/componnetes/header.jsx";
import TopInfo from "./assets/componnetes/topinfo.jsx";
import AddProducts from "./assets/componnetes/AddProducts.jsx";

function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards-react-app");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cards-react-app", JSON.stringify(cards));
  }, [cards]);

  const [search, setSearch] = useState("");

  async function fetchData() {
    const url = "/data/cards.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length == 0) console.log("no productos");
      else setCards(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (cards.length === 0) fetchData();
  }, []);

  const proyectosFiltrados = cards.filter((card) => {
    const texto = card.nom.toLowerCase();

    return texto.includes(search.toLowerCase());
  });

  function handleDelete(id) {
    setCards(cards.filter((card) => card.id != id));
  }

  return (
    <div id="page">
      <TopInfo />
      <Header search={search} setSearch={setSearch} />
      <main>
        <Banner />
        <h2>New Products</h2>
        <section className="product-grid">
          {proyectosFiltrados.map((c) => (
            <Card handleDelete={handleDelete} key={c.id} {...c} />
          ))}
        </section>
      </main>
      <AddProducts products={cards} setProducts={setCards}/>
      <Footer />
    </div>
  );
}

export default App;

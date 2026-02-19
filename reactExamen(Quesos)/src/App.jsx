import "./assets/css/styles.css";

import { useEffect } from "react";
import { useImmer } from "use-immer";

import Header from "./assets/complements/Header.jsx";
import More from "./assets/complements/More.jsx";
import Footer from "./assets/complements/Footer.jsx";
import Articulo from "./assets/complements/Article.jsx";
import Panel from "./assets/complements/Panel.jsx";

export default function App() {
  const [quesos, setQuesos] = useImmer([]);
  const [filteredQuesos, setFilteredQuesos] = useImmer([]);
  const [search, setSearch] = useImmer("");
  const [visibleCount, setVisibleCount] = useImmer(8);

  async function fetchData() {
    const url = "/data/quesos.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setQuesos(data);
      setFilteredQuesos(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleDelete(id) {
    setQuesos(prev => prev.filter(q => q.id !== id));
    setFilteredQuesos(prev => prev.filter(q => q.id !== id));
    setVisibleCount(8);
  }

  function handleFilter() {
    let current = [...quesos];

    const minRaw = document.getElementById("min-price").value;
    const maxRaw = document.getElementById("max-price").value;
    const fat = document.getElementById("fat-filter").value;

    const hasMin = minRaw !== "" && !Number.isNaN(Number(minRaw));
    const hasMax = maxRaw !== "" && !Number.isNaN(Number(maxRaw));

    const minPrice = hasMin ? Number(minRaw) : null;
    const maxPrice = hasMax ? Number(maxRaw) : null;

    const finalPrice = (q) => {
      const price = Number(q.Price.Preu) || 0;
      const discount = Number(q.Price.Discount) || 0;
      return price * (1 - discount / 100);
    };

    if (hasMin) current = current.filter(q => finalPrice(q) >= minPrice);
    if (hasMax) current = current.filter(q => finalPrice(q) <= maxPrice);

    const fatValue = (q) => Number.parseFloat(q.Characteristics.FatContent) || 0;
    if (fat === "low") current = current.filter(q => fatValue(q) <= 25);
    if (fat === "medium") current = current.filter(q => fatValue(q) >= 26 && fatValue(q) <= 29);
    if (fat === "high") current = current.filter(q => fatValue(q) >= 30);

    if (search.trim()) {
      current = current.filter(q =>
        q.Characteristics.Pairing.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    setFilteredQuesos(current);
    setVisibleCount(8);
  }

  const total = filteredQuesos.length;
  const showingAll = visibleCount >= total;

  const displayedQuesosSubset = filteredQuesos.slice(0, visibleCount);

  function handleLoadMore() {
    setVisibleCount(prev => {
      if (prev >= total) return 8;
      return Math.min(prev + 4, total);
    });
  }

  return (
    <div id="root">
      <Header />
      <main>
        <Panel handleFilter={handleFilter} search={search} setSearch={setSearch} />

        <section className="product-matrix" id="grid-cheeses">
          {displayedQuesosSubset.length === 0 ? (
            <p className="no-results">No hay productos que cumplan los filtros.</p>
          ) : (
            displayedQuesosSubset.map(({ id, name, Characteristics: { Pairing, Age, FatContent }, Price: { Preu, Discount }, Origin, img, estrella }) => (
              <Articulo
                handleDelete={handleDelete}
                key={id}
                id={id}
                name={name}
                pairing={Pairing}
                age={Age}
                fatContent={FatContent}
                preu={Preu}
                discount={Discount}
                origin={Origin}
                img={img}
                estrella={estrella}
              />
            ))
          )}
        </section>

      </main>
      {total > 8 && (
        <More
          onClick={handleLoadMore}
          label={showingAll ? "Show Less" : "Load More"}
        />
      )}

      <Footer />
    </div>
  );
}
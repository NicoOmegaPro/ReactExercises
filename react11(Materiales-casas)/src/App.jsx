import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

import CardGrid from "./components/CardGrid";
import Loading from "./components/Loading";

import "./App.css";

export default function App() {
  const pageSize = 3;

  const [tipusMaterials, updateTipusMaterials] = useImmer([]);

  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);
  const [material, setMaterial] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(pageSize);

  useEffect(() => {
    fetch("./data/houses.json")
      .then(res => res.json())
      .then(data => {
        updateTipusMaterials(draft => {
          draft.length = 0;
          data.forEach(item => {
            if (!draft.includes(item.material)) draft.push(item.material);
          });
        });

        setHouses(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  }, [updateTipusMaterials]);

  const filteredHouses = houses.filter(house => {
    const matchesSearch = house.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesMaterial = material ? house.material == material : true;
    return matchesMaterial && matchesSearch;
  });

  const visibleHouses = filteredHouses.slice(0,paginate);
  const hasMore = paginate < filteredHouses.length;

  if(error) return <>{error.message}</>;

  return loading ? (
    <Loading />
  ) : (
    <div className="wrapper">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search for..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
        <CardGrid
          houses={visibleHouses}
          material={material}
          setMaterial={setMaterial}
          tipusMaterials={tipusMaterials}
          loadMore={() => setPaginate(prev => prev + pageSize)}
          hasMore = {hasMore}
        />
    </div>
  );
}

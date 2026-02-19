import Card from "./Card"

export default function CardGrid({houses, material, setMaterial, tipusMaterials, loadMore, hasMore}){
    return(
        <>
        <div className="select">
            <select 
                className="select"
                value={material}
                onChange = {e => setMaterial(e.target.value)}>
                    <option value="">All</option>
                    {tipusMaterials.map( tipusMaterial => 
                        <option key={tipusMaterial} value={tipusMaterial}>Filter by {tipusMaterial}</option>
                    )}
            </select>
        </div>

        <ul className="card-grid">
            {houses.map( house => <li key={house.id}>
                <Card house={house}/>
            </li>)}
        </ul>

        {hasMore && <button className="button" onClick={loadMore}>Load More</button>}
        </>
    )
}
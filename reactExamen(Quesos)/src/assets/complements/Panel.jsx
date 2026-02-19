export default function Panel({ handleFilter, search, setSearch }) {

    return (
        <div className="panel">
            <div className="panel__row">
                <input className="panel__field" id="min-price" placeholder="Min Price" type="number" />
                <input className="panel__field" id="max-price" placeholder="Max Price" type="number" />
                <select className="panel__field" id="fat-filter">
                    <option value="">Fat Content (All)</option>
                    <option value="low">Low (≤ 25%)</option>
                    <option value="medium">Medium (&lt; 30%)</option>
                    <option value="high">High (≥ 30%)</option>
                </select>
                <button onClick={handleFilter} className="btn-action" id="apply-filters">Filter</button>
            </div>
            <div className="panel__row">
                <input
                    className="panel__field"
                    id="pairing-search"
                    placeholder="Search by Pairing"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                />
            </div>
        </div>
    )
}

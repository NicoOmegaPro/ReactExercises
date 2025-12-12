export default function Container ({stars, year, pegi, matching, desc}) {
    return (
        <div className="container">
                {matching>60 && <div className="Coincidencia">{matching} % de Coincidencia </div>}
                <div className="info-card-container">
                    <div>
                        <span className={"pegi age-"+pegi}>{pegi}</span>
                        <span className="year">{year}</span>
                    </div>
                    <div className="tooltip">
                        <div className="tooltiptext">Añadir</div>
                        <span className="material-icons btn-icon">add</span>
                    </div>
                </div>
                {stars>=1 && <div className="score">
                    <div className={stars>0 ? "star" : "star-off"}></div>
                    <div className={stars>1 ? "star" : "star-off"}></div>
                    <div className={stars>2 ? "star" : "star-off"}></div>
                    <div className={stars>3 ? "star" : "star-off"}></div>
                    <div className={stars>4 ? "star" : "star-off"}></div> 
                </div> }
                <p>{desc}</p>
        </div>
        
    )
}
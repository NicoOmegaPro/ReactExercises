export default function Card ({id, nom,descripcion,preu,descompte,puntuacio,img,descomptePor, handleDelete}) {
    return (
        <article className="card">
          {descomptePor?<div className="offer">{descomptePor}</div>:""}
          <div className="info-1">
            <img src={img} alt=""/>
            <h3>{nom}</h3>
            <h4>{descripcion}</h4>
          </div>
          <div className="info2">
            <div className="showcase-rating">
              <i className={puntuacio>0?"fa-solid fa-star":"fa-solid fa-star grey-star"}></i>
              <i className={puntuacio>1?"fa-solid fa-star":"fa-solid fa-star grey-star"}></i>
              <i className={puntuacio>2?"fa-solid fa-star":"fa-solid fa-star grey-star"}></i>
              <i className={puntuacio>3?"fa-solid fa-star":"fa-solid fa-star grey-star"}></i>
              <i className={puntuacio>4?"fa-solid fa-star":"fa-solid fa-star grey-star"}></i>
            </div>
            <div className="price-box">
              <p className="price">{preu} &euro; <del>{descompte} &euro;</del> </p>
              <button>Add</button>&nbsp;
              <button onClick={() => handleDelete(id)}>delete</button>
            </div>
          </div>
        </article>
    )
}
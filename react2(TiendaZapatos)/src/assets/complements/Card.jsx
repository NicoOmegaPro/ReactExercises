export default function Card({name, price, description, stock, newCollection, imgs}) {
    return (
        <article className="card">
          <section className="card-container-img">
            {newCollection && <span className="new">
              <img className="star" src={"public/images/"+imgs.imgStar} alt=""/>
              New
            </span>}
            <img className="img-product" src={(stock<45)?"/public/images/"+imgs.imgSoldOut:"/public/images/"+imgs.imgProduct} alt={name}/>
          </section>
          <section>
            <h2>
              {name}
            </h2>
            <h2>
              {price} €
              {price > 200 && <span style={{marginLeft: '10px'}}>
                30% OFF
              </span>}
            </h2>
            <h2>
              {description}
            </h2>
          </section>
        </article>
    )
}
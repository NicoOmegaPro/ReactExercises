export default function Entrada({img,title,desc}) {
    return (
        <article className="entrada">
            <h2>{title}</h2>
                <p><img src={img} alt={title}/>{desc}
                </p>
            <a href="#" className="boton">Leer Más</a>
      </article>
    )
}
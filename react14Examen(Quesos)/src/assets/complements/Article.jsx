import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Article({
    id,
    name,
    pairing,
    age,
    fatContent,
    preu,
    discount,
    origin,
    img,
    estrella,
    handleDelete
}) {

    const renderStars = () => {
        const stars = [];
        const goldColor = "#FFD700";

        for (let i = 1; i <= 5; i++) {
            if (estrella >= i) {
                stars.push(<FaStar key={i} color={goldColor} />);
            } else if (estrella >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} color={goldColor} />);
            } else {
                stars.push(<FaRegStar key={i} color="#ccc" />);
            }
        }
        return stars;
    };

    return (
        <article className="product-tile">
            <img alt={name} src={img} />

            <h3>Name: {name}</h3>
            <h4>Origin: {origin}</h4>
            <h4>Pairing: {pairing}</h4>
            <h4>Age: {age}</h4>
            <h4>Fat Content: {fatContent}</h4>

            <div className="item-price">
                <span className="item-price__label">Price:</span>
                <span className="item-price__old">€{preu}</span>
                <span className="item-price__new">
                    €{(preu - (preu * discount) / 100).toFixed(2)}
                </span>
                <span className="item-price__badge">-{discount}%</span>
            </div>

            <div className="scoreline">
                {renderStars()}
            </div>

            <button onClick={() => handleDelete(id)} className="btn-action">
                Delete
            </button>
        </article>
    );
}
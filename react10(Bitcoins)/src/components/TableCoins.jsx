import CoinRow from "./CoinRow";

export default function TableCoins({ coins }) {

  if (!coins) return <div>No coins to show</div>;

  return (
    <table className="table table-dark mt-4 table-hover">
      <thead>
        {/* <tr>{titles.map((title, index) => <td key={index}>{title}</td>)}</tr> */}
        <tr>
          <td>#</td>
          <td>Coin</td>
          <td>Price</td>
          <td>Price Change</td>
          <td>24h Volume</td>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow key={coin.id} 
          index={index + 1} 
          coin={coin} />
        ))}
      </tbody>
    </table>
  );
}

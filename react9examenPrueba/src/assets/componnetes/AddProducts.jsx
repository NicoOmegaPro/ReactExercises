import { useState } from "react";
import { nanoid } from "nanoid";

export default function AddProducts({ products, setProducts }) {
  const initialProduct = {
    nom: "",
    descripcion: "",
    preu: "",
    descompte: "",
    puntuacio: 0,
    img: "",
    descomptePor: "",
  };

  const [newProduct, setNewProduct] = useState(initialProduct);

  function handleChange(e) {
    const { name, value } = e.target;

    let parsedValue = value;

    // Mantén strings para precios (tu JSON los tiene como "48.00")
    if (name === "puntuacio") {
      parsedValue = value === "" ? 0 : Number(value);
    }

    setNewProduct((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const code = newProduct.discountCode.trim().toUpperCase();

    let descomptePor = "";
    if (code === "BLACK") descomptePor = "15%";
    if (code === "SUMMER") descomptePor = "10%";

    const productToAdd = {
      id: nanoid(),
      nom: newProduct.nom,
      descripcion: newProduct.descripcion,
      preu: newProduct.preu,
      descompte: newProduct.descompte,
      puntuacio: newProduct.puntuacio,
      img: newProduct.img,
      descomptePor, // ← això és el que usa la Card
    };

    setProducts((prev) => [...prev, productToAdd]);
  }

  return (
    <>
      <h1>Add new product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Name:</label>&nbsp;
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="jacket"
            value={newProduct.nom}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="descripcion">Description:</label>&nbsp;
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            placeholder="Mens Winter Leathers Jackets"
            value={newProduct.descripcion}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="img">Image URL/path:</label>&nbsp;
          <input
            type="text"
            id="img"
            name="img"
            placeholder="/assets/images/products/jacket-3.jpg"
            value={newProduct.img}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="puntuacio">Stars (0-5):</label>&nbsp;
          <input
            type="number"
            id="puntuacio"
            name="puntuacio"
            min="0"
            max="5"
            value={newProduct.puntuacio}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="preu">Price:</label>&nbsp;
          <input
            type="text"
            id="preu"
            name="preu"
            placeholder="48.00"
            value={newProduct.preu}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="descompte">Old price:</label>&nbsp;
          <input
            type="text"
            id="descompte"
            name="descompte"
            placeholder="96.00"
            value={newProduct.descompte}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="discountCode">Discount code:</label>
          <input
            type="text"
            id="discountCode"
            name="discountCode"
            placeholder="BLACK / SUMMER"
            value={newProduct.discountCode}
            onChange={handleChange}
          />
        </div>

        <div className="card">
          <div className="price-box">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

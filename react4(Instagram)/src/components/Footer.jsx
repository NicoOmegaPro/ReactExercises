//import { useState } from "react";
import { useImmer } from "use-immer";

export default function Footer() {
  const initialState = {
    save: false,
    like: false,
    likes: 10,
  };

  //const [estat, setEstat] = useState(initialState);
  const [estat, setEstat] = useImmer(initialState);

  //   function handleChangeLike() {
  //     setEstat(e => ({
  //       ...e,
  //       like: !e.like,
  //       likes: e.like ? e.likes - 1 : e.likes + 1,
  //     }));
  //   }

  function handleChangeLike() {
    setEstat((draft) => {
      draft.like = !draft.like;
      draft.likes += draft.like ? 1 : -1; // si ahora está likeado, suma; si no, resta
    });
  }

  //   function handleChangeSave() {
  //     setEstat(e => ({
  //       ...e,
  //       save: !e.save,
  //     }));
  //   }

  function handleChangeSave() {
    setEstat((draft) => {
      draft.save = !draft.save;
    });
  }

  return (
    <div>
      <div className="footer">
        <div className="footer-icons">
          <span
            className={estat.like ? "corazon_active" : "corazon"}
            onClick={handleChangeLike}
            id="corazon"
          ></span>
          <span className="burbuja" id="b1"></span>
          <span className="enviar" id="e1"></span>
          <div className="guardar-icon-container">
            <span
              className={estat.save ? "guardar_active" : "guardar"}
              onClick={handleChangeSave}
              id="guardar"
            ></span>
          </div>
        </div>
      </div>

      <div className="caption-container">
        <h4>
          <span>{estat.likes}</span> Likes
        </h4>

        <div className="caption">
          <h4>Pedro_Terminator</h4>
          <span>
            ¡Hola Estoy muy feliz!!! aprendiendo React JS. Mira mi gato.
          </span>
        </div>
      </div>
    </div>
  );
}

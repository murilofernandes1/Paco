import { useState } from "react";
import styles from "./NavProducts.module.css";

export default function NavProducts() {
  const [showMenu, setShowMenu] = useState(false);
  const [ordenar, setOrdenar] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <div className={styles.container}>
      <button className={styles.nav} onClick={() => setShowMenu(!showMenu)}>
        Filtrar
      </button>

      <div className={`${styles.menu} ${showMenu ? styles.show : ""}`}>
        <div className={styles.filter}>
          <h1>Ordenar</h1>

          {[
            { id: "vendidos", label: "Mais vendidos" },
            { id: "promo", label: "Em promoção" },
            { id: "az", label: "De A a Z" },
            { id: "za", label: "De Z a A" },
            { id: "maior", label: "Preço: do maior ao menor" },
            { id: "menor", label: "Preço: do menor ao maior" },
          ].map((opt) => (
            <div className={styles.input} key={opt.id}>
              <input
                type="radio"
                name="ordenar"
                id={opt.id}
                value={opt.id}
                checked={ordenar === opt.id}
                onChange={() => setOrdenar(opt.id)}
              />
              <label htmlFor={opt.id}>{opt.label}</label>
            </div>
          ))}

          <h1 className={styles.title}>Categorias</h1>

          {[
            { id: "superiores", label: "Superiores" },
            { id: "inferiores", label: "Inferiores" },
            { id: "acessorios", label: "Acessórios" },
          ].map((cat) => (
            <div className={styles.input} key={cat.id}>
              <input
                type="radio"
                name="categoria"
                id={cat.id}
                value={cat.id}
                checked={categoria === cat.id}
                onChange={() => setCategoria(cat.id)}
              />
              <label htmlFor={cat.id}>{cat.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

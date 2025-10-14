import { useState } from "react";
import styles from "./NavProducts.module.css";
export default function NavProducts() {
  const [hideNav, setHideNav] = useState(true);
  return (
    <>
      <div className={styles.container}>
        <button className={styles.nav} onClick={() => setHideNav(!hideNav)}>
          Filtrar
        </button>

        <div className={`${styles.menu} ${hideNav ? styles.hide : ""}`}>
          <div className={styles.filter}>
            <h1>Ordenar</h1>
            <div className={styles.input}>
              <input type="radio" name="ordenar" id="vendidos"></input>
              <label htmlFor="vendidos">Mais vendidos</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="ordenar" id="promo"></input>
              <label htmlFor="promo">Em promoção</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="ordenar" id="az"></input>
              <label htmlFor="az">De A a Z</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="ordenar" id="za"></input>
              <label htmlFor="za">De Z a A</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="ordenar" id="maior"></input>
              <label htmlFor="maior">Preço: do maior ao menor</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="ordenar" id="menor"></input>
              <label htmlFor="maior">Preço: do menor ao maior</label>
            </div>
            <h1 className={styles.title}>Categorias</h1>
            <div className={styles.input}>
              <input type="radio" name="categoria" id="superiores"></input>
              <label htmlFor="superiores">Superiores</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="categoria" id="inferiores"></input>
              <label htmlFor="inferiores">Inferiores</label>
            </div>
            <div className={styles.input}>
              <input type="radio" name="categoria" id="acessorios"></input>
              <label htmlFor="acessorios">Acessórios</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

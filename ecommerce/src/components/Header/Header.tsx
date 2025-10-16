import styles from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header className={styles.container}>
        <Link className={styles.nav} to={"/"}>
          Home
        </Link>
        <Link className={styles.nav} to={"/catalogo"}>
          Catálogo
        </Link>
        <Link className={styles.nav} to={"/"}>
          Carrinho
        </Link>
        <Link className={styles.nav} to={"/account"}>
          Minha conta
        </Link>
      </header>
    </>
  );
}

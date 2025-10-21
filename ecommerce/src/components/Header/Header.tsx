import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.container}>
      <Link className={styles.nav} to={"/"}>
        Home
      </Link>
      <Link className={styles.nav} to={"/catalogo"}>
        Catálogo
      </Link>

      <Link
        className={styles.nav}
        to={"/cart"}
        style={{ position: "relative" }}
      >
        Carrinho
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </Link>

      <Link className={styles.nav} to={"/account"}>
        Minha conta
      </Link>
    </header>
  );
}

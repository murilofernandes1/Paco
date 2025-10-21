import Card from "../../components/Card/Card";
import NavProducts from "../../components/NavProducts/NavProducts";
import styles from "./Catalogo.module.css";

export default function Catalogo() {
  return (
    <div>
      <NavProducts />
      <div className={styles.container}>
        <Card />
      </div>
    </div>
  );
}

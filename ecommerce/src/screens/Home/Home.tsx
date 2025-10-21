import styles from "./Home.module.css";
import Sale from "../../components/Sale/Sale";
export default function Home() {
  return (
    <>
      <Sale />
      <div className={styles.container}>
        <div className={styles.principal}>
          <h1 className={styles.title}>
            PACO <span>®</span>
          </h1>
          <h2 className={styles.subtitle}>
            Criado com consciência, inspirado pela natureza.
          </h2>
        </div>
      </div>
    </>
  );
}

import styles from "./Card.module.css";
export default function Card() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}></div>
        <div className={styles.product}>
          <p className={styles.name}>Lorem ipsum dolor sit</p>
          <p className={styles.price}>
            R$ 150,00 <span>R$ 200,00</span>
          </p>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import styles from "./Sale.module.css";

const hasSeenSale =
  typeof window !== "undefined" ? localStorage.getItem("hasSeenSale") : "true";

export default function Sale() {
  const [hide, setHide] = useState(hasSeenSale === "true");
  const [copy, setCopy] = useState(false);

  const handleClose = () => {
    setHide(true);
    localStorage.setItem("hasSeenSale", "true");
  };

  const Copy = () => {
    navigator.clipboard.writeText("PACO20");
    setCopy(true);
    setTimeout(() => {
      setHide(true);
    }, 2000);
  };

  if (hide) return null;

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={handleClose}>
        X
      </button>
      <div className={styles.message}>
        <h1>Primeira vez por aqui?</h1>
        <p>
          Use o cupom <span>PACO20</span> e receba 20% de desconto na sua
          primeira compra!
        </p>
        <button className={styles.copy} onClick={Copy}>
          {copy ? <p>Cupom copiado!</p> : <p>Copiar cupom</p>}
        </button>
      </div>
    </div>
  );
}

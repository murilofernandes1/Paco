import { useCart } from "../../context/CartContext";
import { formatBRL } from "../../utils/BRLConvert";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meu Carrinho</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>O carrinho está vazio</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p>{item.name}</p>
                  <p>Cor: {item.color}</p>
                  <p>Tamanho: {item.size}</p>
                  <p>Quantidade: {item.quantity}</p>
                  <p>Preço: {formatBRL(item.price)}</p>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalContainer}>Total: {formatBRL(total)}</div>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={clearCart}>
              Limpar Carrinho
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/checkout")}
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

import { useCart } from "../../contexts/CartContext";
import { formatBRL } from "../../utils/BRLConvert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCreditCard, FaQrcode, FaFileInvoice } from "react-icons/fa";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithDiscount = total - discount;

  const paymentOptions = [
    { id: "credit", label: "Cartão de Crédito", icon: <FaCreditCard /> },
    { id: "pix", label: "Pix", icon: <FaQrcode /> },
    { id: "boleto", label: "Boleto", icon: <FaFileInvoice /> },
  ];

  function handleFinalize() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    if (paymentMethod === "credit") {
      const { number, name, expiry, cvv } = cardData;
      if (!number || !name || !expiry || !cvv) {
        alert("Preencha todos os campos do cartão!");
        return;
      }
    }

    alert(
      `Compra finalizada com sucesso!\nForma de pagamento: ${paymentMethod}\nValor final: ${formatBRL(
        totalWithDiscount
      )}`
    );
    clearCart();
    navigate("/");
  }

  function handleCardChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  }

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "PACO20") {
      setDiscount(total * 0.2);
      setCouponError(false);
    } else {
      setDiscount(0);
      setCouponError(true);
    }
  }
  const couponDiscount = discount;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>O carrinho está vazio</p>
      ) : (
        <div className={styles.cartWrapper}>
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
                  <p>Preço unitário: {formatBRL(item.price)}</p>
                  <p className={styles.subtotal}>
                    Subtotal: {formatBRL(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.totalContainer}>
              <span>Total:</span>
              <div className={styles.totalValues}>
                <span>{formatBRL(totalWithDiscount)}</span>
                {discount ? (
                  <span className={styles.newDiscount}>
                    -{formatBRL(couponDiscount)}
                  </span>
                ) : (
                  <div />
                )}
              </div>
            </div>

            <div className={styles.coupon}>
              <span>Tem um cupom?</span>
              <input
                type="text"
                placeholder="Digite seu cupom"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button type="button" onClick={applyCoupon}>
                Aplicar
              </button>
            </div>
            {couponError === true ? (
              <p className={styles.couponError}>Cupom inválido!</p>
            ) : (
              <div />
            )}
            <div className={styles.payment}>
              <h2>Escolha a forma de pagamento</h2>
              <div className={styles.paymentOptions}>
                {paymentOptions.map((method) => (
                  <div
                    key={method.id}
                    className={`${styles.paymentCard} ${
                      paymentMethod === method.id ? styles.active : ""
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span className={styles.icon}>{method.icon}</span>
                    {method.label}
                  </div>
                ))}
              </div>

              {paymentMethod === "credit" && (
                <div className={styles.cardForm}>
                  <input
                    type="text"
                    name="number"
                    placeholder="Número do cartão"
                    value={cardData.number}
                    onChange={handleCardChange}
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome do titular"
                    value={cardData.name}
                    onChange={handleCardChange}
                    required
                  />
                  <div className={styles.cardRow}>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <select
                    name="installments"
                    value={cardData.installments}
                    onChange={handleCardChange}
                    required
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}x de {formatBRL(totalWithDiscount / n)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button className={styles.button} onClick={handleFinalize}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

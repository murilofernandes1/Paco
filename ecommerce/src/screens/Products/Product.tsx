import styles from "./Products.module.css";
import api from "../../services/api";
import { formatBRL } from "../../utils/BRLConvert";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

type Stock = {
  id: string;
  color: string;
  size: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  sale: number | null;
  image: string;
  description: string;
};
type Review = {
  length: number;
  name: string;
  stars: number;
  content: string;
  user: {
    name: string;
  };
};

export default function Product() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams<{ id: string }>();
  function handleAddToCart() {
    if (!color || !size) {
      alert("Escolha uma cor e um tamanho");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.sale || product.price,
      image: product.image,
      color,
      size,
    });

    alert("Produto adicionado ao carrinho!");
  }
  function buyNow() {
    if (!color || !size) {
      alert("Escolha uma cor e um tamanho antes de continuar");
      return;
    }
    navigate("/checkout");
  }
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    sale: null,
    image: "",
    description: "",
  });
  const [stock, setStock] = useState<Stock[]>([]);
  const [review, setReview] = useState<Review[]>([]);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    async function LoadProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.selectedProduct);
        setStock(response.data.selectedProduct.stock);
        setReview(response.data.selectedProduct.reviews);
        console.log(response.data.selectedProduct.stock);
        console.log(response.data.selectedProduct);
        console.log(response.data.selectedProduct.reviews);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    }
    LoadProduct();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.image}>
              <img src={product.image} />
            </div>
            <div className={styles.info}>
              <h1 className={styles.name}>{product.name}</h1>

              <div className={styles.price}>
                {product.sale == null ? (
                  <span>{formatBRL(product.price / 100)}</span>
                ) : (
                  <span className={styles.sale}>
                    {formatBRL(product.sale)}{" "}
                    <span className={styles.oldprice}>
                      {formatBRL(product.price / 100)}
                    </span>
                  </span>
                )}
              </div>
              <span className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < review.length + review.length / review.length
                      ? "★"
                      : "☆"}
                  </span>
                ))}
              </span>
              <div className={styles.reviewSection}>
                <button
                  className={styles.reviewButton}
                  onClick={() => setShowReviews(true)}
                >
                  Ver avaliações ({review.length})
                </button>

                {showReviews && (
                  <div className={styles.reviewOverlay}>
                    <div className={styles.reviewModal}>
                      <button
                        className={styles.closeButton}
                        onClick={() => setShowReviews(false)}
                      >
                        ✕
                      </button>
                      <h2>Avaliações do produto</h2>

                      {review.length === 0 ? (
                        <p className={styles.noReviews}>
                          Ainda não há avaliações.
                        </p>
                      ) : (
                        <div className={styles.reviewList}>
                          {review.map((r, index) => (
                            <div key={index} className={styles.reviewItem}>
                              <div className={styles.reviewHeader}>
                                <strong>
                                  {r.user.name || "Usuário Anônimo"}
                                </strong>
                                <span>{"★".repeat(r.stars || 5)}</span>
                              </div>
                              <p>{r.content || "Sem comentário"}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {stock.length === 0 ? (
                <h1>Sem estoque</h1>
              ) : (
                <div className={styles.color}>
                  <div className={styles.head}>Cores disponíveis</div>
                  <div className={styles.colorOptionsRow}>
                    {stock.map((s) => (
                      <label key={s.id} className={styles.colorOption}>
                        <input
                          type="radio"
                          name="color"
                          value={s.color}
                          defaultChecked={stock.length === 1}
                          checked={color === s.color}
                          onChange={(e) => setColor(e.target.value)}
                          required
                        />
                        <span
                          className={styles.colorCircle}
                          style={{
                            backgroundColor: s.color.trim().toLowerCase(),
                          }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.head}>Tamanhos disponíveis</div>
              <div className={styles.sizeContainer}>
                {stock.map((s) => (
                  <label key={s.id} className={styles.sizeOption}>
                    <input
                      type="radio"
                      name="size"
                      value={s.size}
                      defaultChecked={stock.length === 1}
                      checked={size === s.size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    />
                    <span className={styles.sizeSquare}>{s.size}</span>
                  </label>
                ))}
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={buyNow}>Comprar Agora</button>
                <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

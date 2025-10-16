import styles from "./Products.module.css";
import api from "../../services/api";
import { formatBRL } from "../../utils/BRLConvert";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
};

export default function Product() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    sale: null,
    image: "",
  });
  const [stock, setStock] = useState<Stock[]>([]);

  useEffect(() => {
    async function LoadProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.selectedProduct);
        setStock(response.data.selectedProduct.stock);
        console.log(response.data.selectedProduct.stock);
        console.log(response.data.selectedProduct);
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
                    />
                    <span className={styles.sizeSquare}>{s.size}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import styles from "./Products.module.css";
import api from "../../services/api";
import { formatBRL } from "../../utils/BRLConvert";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
};
export default function Product() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product>(Object);
  useEffect(() => {
    try {
      async function LoadProduct() {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.selectedProduct);
        console.log(response.data.selectedProduct);
        setLoading(false);
      }
      LoadProduct();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.image}></div>
              <div className={styles.info}>
                <h1 className={styles.name}>{product.name}</h1>
                <p className={styles.price}>{formatBRL(product.price / 100)}</p>
                <p className={styles.price}>Cor</p>
                <div className={styles.color}>
                  <input type="radio" id="option1" name="option" />
                  <label htmlFor="option1">Opção 1</label>

                  <input type="radio" id="option2" name="option" />
                  <label htmlFor="option2">Opção 2</label>
                </div>

                <p className={styles.price}>Tamanho </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

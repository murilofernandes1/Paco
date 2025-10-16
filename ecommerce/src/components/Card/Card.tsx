import api from "../../services/api";
import styles from "./Card.module.css";
import Spinner from "../Spinner/Spinner";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string; // caso venha do backend
};

export default function Card() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function SeeCatalogue() {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    SeeCatalogue();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      {products.map((p) => (
        <div key={p.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={p.imageUrl || "/placeholder.png"}
              alt={p.name}
              className={styles.image}
            />
          </div>
          <div className={styles.productInfo}>
            <p className={styles.name}>{p.name}</p>
            <p className={styles.price}>R$ {p.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

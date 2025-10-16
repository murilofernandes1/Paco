import api from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import styles from "./Account.module.css";

type Product = {
  name: string;
};

type Order = {
  number: string;
  id: string;
  review: number;
  status: string;
  createdAt: string;
  address: string;
  product: Product;
};

type User = {
  name: string;
  orders: Order[];
};

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h1>
        Olá, <span>{user?.name}</span>
      </h1>
      <h2>Minhas compras</h2>
      <div className={styles.ordersContainer}>
        {orders.length > 0 ? (
          orders.map((o) => (
            <div className={styles.order} key={o.id}>
              <span className={styles.product}>{o.product.name}</span>
              <p>
                Código do pedido: <span>{o.number}</span>
              </p>
              <p>
                Endereço de entrega: <span>{o.address}</span>
              </p>
              <p>
                Pedido feito em:{" "}
                <span>
                  {new Date(o.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
              {o.status === "Pending" ? (
                <div>
                  <span className={styles.status}>
                    Status:{" "}
                    <span className={styles.pending}>Pagamento pendente</span>
                  </span>
                  <div className={styles.pay}>
                    <button>
                      <span>Pagar pedido agora</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <span className={styles.status}>Status: </span>
                  <span className={styles.payed}>Pedido pago</span>
                  {o.review > 0 ? (
                    <span> - Avaliação: {o.review}</span>
                  ) : (
                    <div className={styles.review}>
                      <button>
                        <span>Avaliar agora</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Sem pedidos</p>
        )}
      </div>
    </div>
  );
}

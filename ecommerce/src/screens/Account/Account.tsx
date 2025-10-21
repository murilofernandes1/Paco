import api from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import styles from "./Account.module.css";

type Product = { name: string };
type Review = { id: string; stars: number };
type Order = {
  id: string;
  number: string;
  status: string;
  createdAt: string;
  address: string;
  product: Product;
  review: Review | null;
};
type User = { name: string; orders: Order[] };

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
      <h1 className={styles.ola}>
        Olá, <span>{user?.name}!</span>
      </h1>
      <h2>Minhas compras</h2>

      {orders.length === 0 ? (
        <p>Sem pedidos</p>
      ) : (
        <div className={styles.ordersContainer}>
          {orders.map((o) => (
            <div className={styles.orderCard} key={o.id}>
              <div className={styles.orderHeader}>
                <p>
                  Código do pedido: <span>{o.number}</span>
                </p>
                <p>
                  Data da compra:{" "}
                  <span>
                    {new Date(o.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </p>
                <p>
                  Endereço de entrega: <span>{o.address}</span>
                </p>
              </div>

              <div className={styles.statusSection}>
                {o.status === "Pending" ? (
                  <div className={styles.pendingSection}>
                    <span className={styles.pending}>Pagamento pendente</span>
                    <button className={styles.payBtn}>Pagar agora</button>
                  </div>
                ) : (
                  <div className={styles.payedSection}>
                    <span className={styles.payed}>Pedido pago</span>
                    {o.review ? (
                      <div className={styles.reviewResume}>
                        Minha avaliação:{" "}
                        <span className={styles.stars}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < o.review!.stars ? "★" : "☆"}
                            </span>
                          ))}
                        </span>
                      </div>
                    ) : (
                      <button className={styles.reviewBtn}>
                        Avaliar agora
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import styles from "./Login.module.css";
import Spinner from "../../../components/Spinner/Spinner";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function HandleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: token } = await api.post("/users/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", token);
      alert("Usuário logado com sucesso");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError(true);

      console.log(error);
    }
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={HandleLogin}>
            <h1 className={styles.title}>Entrar</h1>
            <div className={styles.inputcontainer}>
              <p className={styles.label}>Email</p>
              <input
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
              <p className={styles.label}>Senha</p>
              <input
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button>Entrar</button>
            <div className={styles.auth}>
              <p className={styles.message}>
                Não tem uma conta?{" "}
                <span>
                  <Link className={styles.link} to="/register">
                    Registre-se
                  </Link>
                </span>
              </p>
            </div>
            {error ? (
              <p className={`${styles.error} ${error ? styles.show : ""}`}>
                Email ou senha inválidos.
              </p>
            ) : (
              <div />
            )}
          </form>
        </div>
      )}
    </>
  );
}

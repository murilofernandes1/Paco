import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import api from "../../../services/api";
import styles from "./Register.module.css";
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function HandleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: token } = await api.post("/users/register", {
        name: name,
        email: email,
        password: password,
      });
      localStorage.setItem(token, "token");
      alert("Usuário registrado com sucesso");
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
            <h1 className={styles.title}>Registrar-se</h1>
            <div className={styles.inputcontainer}>
              <p className={styles.label}>Nome</p>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
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
                Já tem uma conta?{" "}
                <span>
                  <Link className={styles.link} to="/login">
                    Entrar
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

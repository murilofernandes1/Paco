import { useState } from "react";
import api from "../../../services/api";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function HandleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: token } = await api.post("/users/login", {
        email: email,
        password: password,
      });
      localStorage.setItem(token, "token");
      alert("Usuário logado com sucesso");
      navigate("/");
    } catch (error) {
      alert("Email ou senha inválidos");
      console.log(error);
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={HandleLogin}>
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <button>Entrar</button>
      </form>
      {isLoading ? <p>Ta carregando</p> : <div />}
    </div>
  );
}

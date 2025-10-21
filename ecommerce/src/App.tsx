import Header from "./components/Header/Header";
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";
export default function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <AppNavigator />
      </CartProvider>
    </>
  );
}

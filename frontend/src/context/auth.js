import { createContext, useEffect, useState } from "react";
import { message } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [priceFinal, setPriceFinal] = useState(0);
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      setUser({ email: "teste", password: "teste" });
    }
  }, []);

  const signin = (email, password) => {
    if (email === "teste" && password === "teste") {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
      setUser({ email, password });
      return;
    } else {
      return "E-mail ou senha incorretos";
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  const addItem = (item) => {
    setItems([...itens, item]);
  };

  const [itens, setItems] = useState([
]);

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout, itens, addItem, setPriceFinal, priceFinal }}
    >
      {children}
    </AuthContext.Provider>
  );
};
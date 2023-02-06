import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Modal, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import  useAuth  from "../../../hooks/useAuth";

const Login = () => {
  const { signin, user, signout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }
    const res = signin(email, senha);
    if (res) {
      setError(res);
      return;
    }
    message.success("Sucesso! Você está logado!", 2).then(() => {
      navigate("/");
    });
  };  

  const handleSignOut = () => {
    signout();
    };


  // if there's a user show the message below
  if (user) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Button onClick={handleSignOut} style={{ marginRight: "10px" }}>
            Logout
          </Button>
          <Button type="primary" onClick={showModal}>
            Compras realizadas
          </Button>
        </div>

        <Modal
          cancelButtonProps={{ style: { display: "none" } }}
          open={isModalOpen}
          onOk={handleOk}
          closable={false}
        >
          <h1>Função "Compras" será implementada aqui.</h1>
        </Modal>
      </>
    );
  }

  // if there's no user, show the login form
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form onFinish={handleLogin} style={{ width: 300 }}>
        <Tag color="#f50">Você não está logado.</Tag>
          <Form.Item>
            <Input
              type="text"
              value={email}
              placeholder="Username"
              onChange={(e) => [setEmail(e.target.value), setError("")]}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              value={senha}
              placeholder="Password"
              onChange={(e) => [setSenha(e.target.value), setError("")]}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleLogin} type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
        {error}
      </div>
    </>
  );
};

export default Login;

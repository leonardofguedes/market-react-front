import React, { useState, useEffect, useContext } from "react";
import { Card, Modal, Col, Row, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, addItem } = useAuth();

  const handleModalOk = () => {
    setModalVisible(false);
    navigate("/contact");
  };
  
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/api/produtos/");
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleAddToCart = (item) => {
    addItem(item);
    setModalVisible(true);
  };

  const LoginButton = ({ item }) => {
    return user ? (
      <Button type="primary" onClick={() => handleAddToCart(item)}>
        Adicionar ao carrinho
      </Button>
    ) : (
      <Link to="/login">
        <Button type="primary">Comprar</Button>
      </Link>
    );
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{ width: 300, margin: "0 auto" }}
              cover={
                item.image ? (
                  <img src={item.image} alt={item.name} style={{ width: '300px', height: '270px', justifyContent: 'center' }} />
                ) : (
                  <img
                    src="https://images.pexels.com/photos/3513237/pexels-photo-3513237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt={item.name}
                    style={{ width: '300px', height: '270px' }}
                  />
                )
              }
              onClick={() => handleCardClick(item.id)}
            >
              {selectedId === item.id ? (
                <>
                  <p>Tipo de Produto: {item.brand}</p>
                  <p>Preço Original: {item.price}</p>
                  <p>Peso Carga: {item.weight}</p>
                  <p>Desconto por item: {item.discount}</p>
                  <p>Quantidade: {item.quantity} itens</p>
                  <p>Data de vencimento: {item.expiration_date}</p>
                  <p>
                    Preço total: R${" "}
                    {(item.price - item.discount) * item.quantity}
                  </p>
                  <LoginButton item={item} />
                </>
              ) : (
                <>
                <Typography.Title level={1} style={{ textAlign: "center", marginTop: "-20px" }}>{item.name}</Typography.Title>
                <Typography.Title type="secondary" level={3} style={{ textAlign: "center", marginTop: "2px" }}>{item.brand}</Typography.Title>
                </>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Adicionei esse produto. Você deseja ir para o carrinho?"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Não
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Sim
          </Button>,
        ]}
      />
    </>
  );
};

export default Home;

import { Table, Button, Input, message } from "antd";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { DollarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const { itens, setPriceFinal } = useAuth();
  const [items, setItems] = useState(itens);
  const [loading, setLoading] = useState(false);

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const calculateTotal = (items) => {
    return items.reduce(
      (acc, item) => acc + (item.price - item.discount) * item.quantity,
      0
    );
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setPriceFinal(calculateTotal(items));
      setLoading(false);
      navigate("/payment");
    }, 5000);
  };

  const Total = [
    {
      title: "Total",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        (record.price - record.discount) * record.quantity,
    },
  ];

  const columns = [
    {
      title: "Produto",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="item" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Desconto",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Preço Total",
      dataIndex: "total",
      key: "total",
      render: (total, record) =>
        (record.price - record.discount) * record.quantity,
    },
    {
      title: "Ações",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" danger onClick={() => removeItem(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1>Carrinho de Compras</h1>
        <Table
          dataSource={items}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.id}
          locale={{ emptyText: "Não existem produtos nesse carrinho" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
        <Input.Group compact>
          <Input style={{ width: "200px" }} defaultValue="#CUPONS#" />
          <Button type="primary">Aplicar</Button>
        </Input.Group>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            float: "right",
            marginRight: "1em",
          }}
        >
          {items.length > 0 && (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.5em",
                textAlign: "center",
                marginBottom: "1em",
                backgroundColor: "#F5F5F5",
                padding: "1em",
              }}
            >
              Total: R$ {calculateTotal(items)}
            </div>
          )}
          {items.length > 0 && (
            <Button
              type="primary"
              icon={<DollarOutlined />}
              size={"large"}
              style={{ width: "300px" }}
              loading={loading}
              onClick={handlePayment}
              disabled={loading}
            >
              Ir para o pagamento
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;

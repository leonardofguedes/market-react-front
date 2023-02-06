import { QRCode } from "antd";
import React, { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import {Typography} from 'antd';
const { Paragraph } = Typography;

const Payment = () => {
  const { priceFinal } = useAuth();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#E6F7FF",
          flexDirection: "column",
        }}
      >
        <h1>Valor Final: R$ {priceFinal}</h1>
        <Paragraph copyable>Código PIX: 123456789</Paragraph>
        <h1>FAÇA O PIX E MANDE O COMPROVANTE PARA O NÚMERO 123456789</h1>
        <div style={{ backgroundColor: "white" }}>
          <QRCode value="https://ant.design/" />
        </div>
      </div>
    </>
  );
};

export default Payment;

import React, { useState, useEffect, useCallback, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { HomeOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { AuthProvider } from "../context/auth";

const { Sider } = Layout;

const ViewsApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
  const { user } = 'leonardo'

  const handleSelectedKeys = useCallback(
    (pathname) => {
      if (pathname !== selectedKeys[0]) {
        setSelectedKeys([pathname]);
      }
    },
    [selectedKeys]
  );

  useEffect(() => {
    handleSelectedKeys(location.pathname);
  }, [handleSelectedKeys, location.pathname]);

  return (
    <Layout
      theme="blossom"
      style={{ height: "100vh", backgroundColor: "#e6fffb" }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          backgroundColor: "#87e8de",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          mode={collapsed ? "vertical" : "inline"}
          selectedKeys={selectedKeys}
          style={{color: "white", backgroundColor: "#36cfc9"}}
        >
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined type={collapsed ? "home" : null} />
              {collapsed ? null : " Home"}
            </Link>
          </Menu.Item>
          <Menu.Item key="/contact">
            <Link to="/contact">
              <PieChartOutlined type={collapsed ? "safety" : null} />
              {collapsed ? null : " Carrinho"}
            </Link>
          </Menu.Item>
          <Menu.Item key="/login">
            <Link to="/login">
              <UserOutlined type={collapsed ? "safety" : null} />
              {collapsed ? null : user ? " Informações Pessoais" : " Login"}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <div
        style={{
          position: "absolute",
          left: collapsed ? 80 : 200,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Outlet />
      </div>
    </Layout>
  );
};

export default ViewsApp;

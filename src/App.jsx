import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Product from "./pages/dashboard/Product";
import AddProduct from "./pages/dashboard/ProductCreate";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import UpdateProduct from "./pages/dashboard/ProductUpdate2";

const { Header, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='/signin' element={<Login />} />

        {/* Protected Route - Dashboard */}
        <Route
          path='/dashboard/*'
          element={
            <Layout style={{ minHeight: "100vh" }}>
              {/* Sidebar */}
              <Sidebar collapsed={collapsed} />

              {/* Main Content */}
              <Layout>
                <Header
                  style={{
                    padding: 0,
                    background: "#fff",
                    display: "flex",
                    boxShadow: "0 2px 8px #f0f1f2",
                  }}
                >
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={toggleCollapsed}
                    style={{ fontSize: "16px", marginLeft: "16px" }}
                  />
                </Header>
                <Content
                  style={{
                    margin: "16px",
                    padding: "16px",
                    background: "#fff",
                    minHeight: "280px",
                  }}
                >
                  <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='products' element={<Product />} />
                    <Route path='products/add' element={<AddProduct />} />
                    <Route path='products/create' element={<AddProduct />} />
                    <Route path='products/:id' element={<UpdateProduct />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import { Layout, theme } from "antd";
import React from "react";
import ContentLayout from "../components/layout/Content";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
const { Header, Footer } = Layout;

const Layouts = () => {
  const { currentUser } = useAuth();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingRight: 20,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <div className="pr-2">
            {" "}
            User: <b>{currentUser?.email}</b>
          </div>
        </Header>
        <ContentLayout />
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Layouts;

import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Home", "1", <TeamOutlined />),
  getItem("Logout", "2", <UserOutlined />),
];

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleChange = async (e) => {
    if (e.key == "1") history("/home");
    if (e.key === "2") {
      setError("");

      try {
        await logout();
        history("/login");
      } catch {
        setError("Failed to log out");
      }
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {" "}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleChange}
        />
      </Sider>
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
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Family</Breadcrumb.Item>
            <Breadcrumb.Item>Tree</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
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

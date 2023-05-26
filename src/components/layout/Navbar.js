import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const { Sider } = Layout;
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
const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();
  const { logout } = useAuth();

  const handleChange = async (e) => {
    if (e.key === "1") history("/home");
    if (e.key === "2") {
      setError("");

      try {
        await logout();
        history("/login");
      } catch {
        setError("Failed to log out");
        message.error(error);
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export default Navbar;

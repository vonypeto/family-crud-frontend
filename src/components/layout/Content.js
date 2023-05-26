import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const ContentLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
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
    </>
  );
};

export default ContentLayout;

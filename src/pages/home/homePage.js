import { Breadcrumb, Layout, theme } from "antd";
import React, { useState } from "react";
import Headers from "../../components/headers/headers";
import Sidebarr from "../../components/sidebar/sidebar";
const { Content, Footer } = Layout;
const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0"
        }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer
        }}>
        Bill is a Bill.
      </div>
    </>
  );
};

export default HomePage;

import React from "react";
import { Layout, theme } from "antd";

const Headers = () => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer
      }}
    />
  );
};

export default Headers;

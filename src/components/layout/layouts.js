import React, { useState } from "react";
import { Layout } from "antd";
import Footers from "../footers/footers";
import Sidebarr from "../sidebar/sidebar";
import Headers from "../headers/headers";
const { Content } = Layout;
const Layouts = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}>
      <Sidebarr collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="site-layout">
        <Headers />
        <Content
          style={{
            margin: "0 16px"
          }}>
          {children}
        </Content>
        <Footers />
      </Layout>
    </Layout>
  );
};

export default Layouts;

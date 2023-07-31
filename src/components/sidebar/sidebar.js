import React from "react";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  Route,
  Routes,
  Link
} from "react-router-dom";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  DesktopOutlined
} from "@ant-design/icons";

const Sidebarr = ({ collapsed, setCollapsed }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Auth.userData);
  const { Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label
    };
  }
  const LogoutUser = () => {
    dispatch({ type: "USER_LOGOUT" });
  };
  // const items = [
  //   getItem("Home", "1", <PieChartOutlined />),
  //   getItem("Option 2", "2", <DesktopOutlined />),
  //   getItem("User", "sub1", <UserOutlined />, [
  //     getItem("Tom", "3"),
  //     getItem("Bill", "4"),
  //     getItem("Alex", "5")
  //   ]),
  //   getItem("Team", "sub2", <TeamOutlined />, [
  //     getItem("Team 1", "6"),
  //     getItem("Team 2", "8")
  //   ]),
  //   getItem("Logout", "9", <FileOutlined />)
  // ];
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)"
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={[
          {
            key: "1",
            icon: <PieChartOutlined />,
            label: "Home",
            onClick: () => {
              navigate("/");
            }
          },
          {
            key: "6",
            icon: <AppstoreOutlined />,
            style: {
              display: userData?.data?.role === "Superadmin" ? "" : "none"
            },
            label: "Companies",
            onClick: () => {
              navigate("/companies");
            }
          },
          {
            key: "4",
            icon: <AppstoreOutlined />,
            label: "Brands",
            onClick: () => {
              navigate("/brands");
            }
          },
          {
            key: "5",
            icon: <TeamOutlined />,
            label: "Users",

            onClick: () => {
              navigate("/users");
            }
          },
          {
            key: "2",
            icon: <DesktopOutlined />,
            label: "Page 2",
            children: [
              {
                key: "3",
                label: "logout",
                icon: <DesktopOutlined />,
                onClick: () => LogoutUser()
              }
            ]
          }
        ]}
      />
    </Sider>
  );
};

export default Sidebarr;

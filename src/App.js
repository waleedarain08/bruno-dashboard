import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/auth/login/login";
import { useSelector } from "react-redux";
import Layout from "./components/layout/layouts";
import Brands from "./pages/brands/brands";
import Companies from "./pages/companies/companies";
import Users from "./pages/users/users";

const App = () => {
  const userData = useSelector((state) => state.Auth.userData);
  console.log(userData, "userData");
  return (
    <>
      {userData !== null ? (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands" element={<Brands />} />
            {userData?.data?.role === "Superadmin" && (
              <>
                <Route path="/companies" element={<Companies />} />
              </>
            )}
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};
export default App;

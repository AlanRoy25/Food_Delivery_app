import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppDownload from "./components/AppDownload/AppDownload";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";

const App = () => {
  return (
    <>
      <Navbar cartItemCount={0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ExploreMenu />} />
        <Route path="/app-download" element={<AppDownload />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<PlaceOrder />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import GuestHeader from "../Header/GuestHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const GuestLayout = () => {
 
  return (
    <>
      <GuestHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default GuestLayout;

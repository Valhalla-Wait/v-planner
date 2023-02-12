import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AccountPageLayout from "../components/Layouts/AccountPageLayout";
import CabinetLayout from "../components/Layouts/CabinetLayout";
import MainPageLayout from "../components/Layouts/MainPageLayout";
import About from "../pages/About";
import VendorAccount from "../pages/Account/VendorAccount";
import Faq from "../pages/Faq";
import Help from "../pages/Help";
import VendorHistory from "../pages/History/VendorHistory";
import VendorOrders from "../pages/Orders/VendorOrders";
import Policy from "../pages/Policy";
import VendorQuotes from "../pages/Quotes/VendorQuotes";
import Reports from "../pages/Reports";
import Rules from "../pages/Rules";
import VendorChat from "../pages/Chat/VendorChat";
import Quote from "../pages/Quote/Quote";
import { connect } from "react-redux";
import QuoteForm from "../pages/QuoteForm/QuoteForm";


function VendorRouter({ vendorData }) {

  const url = vendorData.vendorModel?.photos.length && vendorData.vendorModel.photos.find((obj => obj.type === "AVATAR")).name
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CabinetLayout
            name={vendorData.firstName}
            image={url}
          />
        }
      >
        <Route path="/" element={<MainPageLayout />}>
          <Route path="/" element={<Navigate to="/chat" />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/orders" element={<VendorOrders />} />
          <Route path="/quotes" element={<VendorQuotes />} />
          <Route path="/history" element={<VendorHistory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/chat" element={<VendorChat />} />
          <Route path="/quote-form" element={<QuoteForm />} />
          <Route path="/chat/:id" element={<VendorChat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/quote" element={<Quote />} />
        <Route path="/account" element={<AccountPageLayout />}>
          <Route path="/account" element={<VendorAccount />} />
          <Route path="/account/:id" element={<VendorAccount />} />
          <Route path="*" element={<Navigate to="/account" />} />
        </Route>
      </Route>
    </Routes>
  );
}
const mapStateToProps = function (state) {
  return {
    vendorData: state.userInfo.userData,
  };
};


export default connect(mapStateToProps)(VendorRouter);
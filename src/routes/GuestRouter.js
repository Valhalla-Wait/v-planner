import { Route, Routes } from "react-router-dom";
import GuestLayout from "../components/Layouts/GuestLayout";
import About from "../pages/About";
import Faq from "../pages/Faq";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Policy from "../pages/Policy";
import Rules from "../pages/Rules";

export default function GuestRouter(props) {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="rules" element={<Rules />} />
        <Route path="policy" element={<Policy />} />
        <Route path="help" element={<Help />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

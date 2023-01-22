import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import CabinetHeader from "../Header/CabinetHeader";

const CabinetLayout = ({ name, image }) => {
   console.log("name in header",name)
   console.log("image in header",image)
  return (
    <>
      <CabinetHeader name={name} image={image} />
      <Outlet />
      <Footer />
    </>
  );
};

export default CabinetLayout;

import AdminRouter from "./AdminRouter";
import GuestRouter from "./GuestRouter";
import UserRouter from "./UserRouter";
import VendorRouter from "./VendorRouter";

export default function Routes(isAuth, role) {

  if (!isAuth) {
    return <GuestRouter />;
  }

  if (role === process.env.REACT_APP_ROLE_USER) {
    return <UserRouter />;
  }

  if (role === process.env.REACT_APP_ROLE_VENDOR) {
    return <VendorRouter />;
  }

  if (role === process.env.REACT_APP_ROLE_ADMIN) {
    return <AdminRouter />
  }

  return <p>none was loaded</p>
}

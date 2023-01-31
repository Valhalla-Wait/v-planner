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

  else {
    console.log('route: none was loaded')
  }

  if (isAuth) {
    console.log("isAuth")
  }
  return <p>none was loaded</p>
}

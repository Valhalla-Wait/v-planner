import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import ModalWrapper from "./components/UI/Modal/ModalWrapper";
import { ModalContext } from "./context/ModalContext";
import { AuthContext } from "./context/AuthContext";
import useModal from "./hooks/useModal";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { NotifyContext } from "./context/NotifyContext";
import useNotify from "./hooks/useNotify";
import { SidebarContext } from "./context/SidebarContext";
import useSidebar from "./hooks/useSibedar";
import { ThemeContext } from "./context/ThemeContext";
import useTheme from "./hooks/useTheme";
import ScrollToTop from "./components/SrcollToTop";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./Store/Actions/getCurrentUser";
import AuthService from "./services/AuthService";
import { getLikedVendors } from "./Store/Actions/getLikedVendors";
const App = (props) => {
  const modal = useModal();
  const auth = useAuth();
  const notify = useNotify();
  const sidebar = useSidebar();
  const theme = useTheme();

  const state = useSelector(state => state.userInfo)
  const isAuthClient = useSelector(state => state.userInfo?.userData?.id)
  const isAuthVendor = useSelector(state => state.vendorInfo?.vendorData?.id)
  const roleClient = useSelector(state => state.userInfo.userData?.roleModel?.role)
  const roleVendor = useSelector(state => state.vendorInfo.vendorData?.roleModel?.role)

  // console.log('state', state)
  // console.log('isAuth', isAuth)
  // console.log('role', role)

  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const getAuth = () => {
    if(isAuthClient && token) return isAuthClient
    if(isAuthVendor && token) return isAuthVendor
    return false
  }

  const getRole = () => {
    if(roleClient) return roleClient
    if(roleVendor) return roleVendor
    return false
  }



  const routes = Routes(getAuth(), getRole());
  // const routes = Routes(isAuth, role);

  useEffect(() => {
    console.log('app js')
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getCurrentUser(token))
      dispatch(getLikedVendors())
      auth.check()
    }
  }, []);

  // debugger

  return (
    <AuthContext.Provider value={{ ...auth }}>
      <ModalContext.Provider value={{ ...modal }}>
        <NotifyContext.Provider value={{ ...notify }}>
          <SidebarContext.Provider value={{ ...sidebar }}>
            <ThemeContext.Provider value={{ ...theme }}>
              <BrowserRouter>
                <ScrollToTop />
                {routes}
                <ModalWrapper />
              </BrowserRouter>
            </ThemeContext.Provider>
          </SidebarContext.Provider>
        </NotifyContext.Provider>
      </ModalContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;

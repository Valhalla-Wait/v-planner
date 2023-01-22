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
import { connect } from "react-redux";
const App = (props) => {
  const modal = useModal();
  const auth = useAuth();
  const notify = useNotify();
  const sidebar = useSidebar();
  const theme = useTheme();

  const routes = Routes(auth.isAuth, auth.user?.role);

  console.log(auth.isAuth)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      auth.check();
    }
  }, []);

  if (auth.isLoading) {
    return <>Loading</>;
  }

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

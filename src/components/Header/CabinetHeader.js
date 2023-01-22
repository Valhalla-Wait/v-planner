import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { NotifyContext } from "../../context/NotifyContext";
import { SidebarContext } from "../../context/SidebarContext";
import { ThemeContext } from "../../context/ThemeContext";
import useDevice from "../../hooks/useDevice";
import LogoutModal from "../Modals/LogoutModal";
import Logo from "../UI/Logo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const CabinetHeader = ({ name, image }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [notifyActive, setNotifyActive] = useState(false);
  const auth = useContext(AuthContext);
  const modal = useContext(ModalContext);
  const notify = useContext(NotifyContext);
  const sidebar = useContext(SidebarContext);
  const theme = useContext(ThemeContext);

  const device = useDevice();

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userInfo);
  const state = useSelector((state) => state.userInfo);

  const { userInfo } = useSelector((state) => state);
  console.log("state in notlify",state)
  return (
    <header className="header header-shadow">
      <div className="container">
        <div className="header__content">
          <Link to="/">
            <Logo alt="Alt logo" />
          </Link>
          <div className="header__nav nav-header">
            <div
              className="nav-header__item"
              onClick={() => {
                setMenuActive(!menuActive);
                setNotifyActive(false);
                sidebar.destroy();
              }}
            >
              <div className="nav-header__text">Hi, {name}!</div>
              <div className="nav-header__icon border">
                {auth.user.profile.avatar ? (
                  <img src={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${image}`} alt="Avatar" />
                ) : (
                  <i className="icon-camera"></i>
                )}
              </div>
              <div
                className={
                  menuActive
                    ? "nav-header__menu menu-nav-header active"
                    : "nav-header__menu menu-nav-header"
                }
                onClick={(e) => e.stopPropagation()}
              >
                <div className="menu-nav-header__list">
                  <div
                    className="menu-nav-header__item"
                    onClick={() => {
                      navigate("/account");
                      setMenuActive(false);
                    }}
                  >
                    <span>Account Settings</span>
                  </div>
                  <div
                    className="menu-nav-header__item"
                    onClick={() => {
                      theme.toggle();
                      setMenuActive(false);
                    }}
                  >
                    <span>{theme.get() === "dark" ? "Day" : "Night"} Mode</span>
                    <div className="theme-change">
                      <div className="theme-change__item">
                        <i className="icon-sun"></i>
                      </div>
                      <div className="theme-change__item">
                        <i className="icon-moon"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className="menu-nav-header__item"
                    onClick={() => {
                      modal.start();
                      modal.setContent(<LogoutModal />);
                      setMenuActive(false);
                    }}
                  >
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="nav-header__item"
              onClick={() => {
                setNotifyActive(!notifyActive);
                setMenuActive(false);
                sidebar.destroy();
              }}
            >
              <div className="nav-header__icon">
                <i className="icon-notification">
                  <span></span>
                </i>
              </div>
              <div
                className={
                  notifyActive
                    ? "nav-header__notify notify-nav-header active"
                    : "nav-header__notify notify-nav-header"
                }
                onClick={(e) => e.stopPropagation()}
              >
                {/* <div className="notify-nav-header__title">Notifications</div> */}
                <div className="notify-nav-header__list">
                  {notify.getAll().map((item) => (
                    <div className="notify-nav-header__item" key={item.id}>
                      <div className="notify-nav-header__icon">
                        {!item.seen && <span></span>}
                      </div>
                      <div className="notify-nav-header__body">
                        <div className="notify-nav-header__name">
                          {item.title}
                        </div>
                        <div className="notify-nav-header__text">
                          {item.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {device.isMobile && (
              <div className="nav-header__item">
                <div
                  className={
                    sidebar.isActive
                      ? "btn btn-burger active"
                      : "btn btn-burger"
                  }
                  onClick={() => {
                    setMenuActive(false);
                    setNotifyActive(false);
                    sidebar.toggle();
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CabinetHeader;

import { Link } from "react-router-dom";
import useDevice from "../../hooks/useDevice";
import EmailSubscribeForm from "../Forms/EmailSubscribeForm";
import Social from "../Social";
import Logo from "../UI/Logo";

export function Footer() {

  const { isMobile } = useDevice()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content content-footer">
          <div className="content-footer__cell">
          <Link to="/">
            <Logo />
          </Link>
          </div>
          <div className="content-footer__cell">
            <div className="content-footer__menu menu-footer">
              { !isMobile ? <div className="menu-footer__name">Contacts</div> : null}
              <ul className="menu-footer__list">
                <li className="menu-footer__item"><a href="tel:+12121234567">+1-212-123 45 67</a></li>
                <li className="menu-footer__item"><address>12 Stock Road<br />Charlottesville, CA 7899-274</address></li>
              </ul>
            </div>
          </div>
          <div className="content-footer__cell">
            <div className="content-footer__menu menu-footer">
              <div className="menu-footer__name">Company</div>
              <ul className="menu-footer__list">
                <li className="menu-footer__item"><Link to="/about">About Company</Link></li>
                <li className="menu-footer__item"><Link to="/rules">Terms of Services</Link></li>
                <li className="menu-footer__item"><Link to="/policy">Privacy Policy</Link></li>
                <li className="menu-footer__item"><Link to="/help">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="content-footer__cell">
            <div className="content-footer__menu menu-footer">
              <div className="menu-footer__name">Newsletters</div>
              <EmailSubscribeForm />
              <Social
                columnGap={isMobile ? 28 : 20}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
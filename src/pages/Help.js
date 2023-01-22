import { useContext } from "react"
import { Link } from "react-router-dom"
import HelpForm from "../components/Forms/HelpForm"
import { AuthContext } from "../context/AuthContext"

export default function Help() {
  
  const auth = useContext(AuthContext)

  const content = () => {
    return (
      <div className="help__content">
        <h3>Help</h3>
        <div className="help__header">
          <h4>Did not find the answer to your question?</h4>
          <span className="help__header-info">Read <Link to="/faq" className="link">FAQ</Link></span>
        </div>
        <HelpForm />
      </div>
    ) 
  }

  return (
    <section className="help">
      { auth.isAuth ? content() : <div className="container">{ content() }</div> }
    </section>
  )
}
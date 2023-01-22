import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Rules() {

  const auth = useContext(AuthContext)

  const content = () => {
    return (
      <div className="rules__content">
        Rules page
      </div>
    ) 
  }

  return (
    <section className="rules">
      { auth.isAuth ? content() : <div className="container">{ content() }</div> }
    </section>
  )
}
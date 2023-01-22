import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Policy() {

  const auth = useContext(AuthContext)

  const content = () => {
    return (
      <div className="policy__content">
        Policy page
      </div>
    ) 
  }

  return (
    <section className="policy">
      { auth.isAuth ? content() : <div className="container">{ content() }</div> }
    </section>
  )
}
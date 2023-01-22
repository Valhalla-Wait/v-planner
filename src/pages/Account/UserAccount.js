import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserUpdatePersonalInformation from "../../components/Forms/User/UserUpdatePersonalInformation";
import UserUpdateWeddingInformation from "../../components/Forms/User/UserUpdateWeddingInformation";
import Security from "../../components/Security";

export default function UserAccount() {

  const { id } = useParams()

  useEffect(() => {
    const selector = document.querySelector(`[data-to="${id}"]`)
    if(!selector) return

    const { offsetTop } = selector

    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth"
    })
  }, [id])

  return (
    <section className="account">
      <UserUpdatePersonalInformation />
      <UserUpdateWeddingInformation />
      <Security />
    </section>
  )
}
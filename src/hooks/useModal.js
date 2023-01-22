import { useState } from "react"

const useModal = () => {
  
  const [isActive, setActive] = useState(false)
  const [content, setContent] = useState("")

  const start = () => {
    document.body.classList.add("no-scroll")
    setActive(true)
  }

  const destroy = () => {
    document.body.classList.remove("no-scroll")
    setActive(false)
  }

  return { start, destroy, setContent, isActive, content }
}

export default useModal
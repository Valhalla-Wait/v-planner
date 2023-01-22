import { useState } from "react"

const useSidebar = () => {
  const [isActive, setActive] = useState(false)

  const toggle = () => setActive(!isActive)

  const destroy = () => setActive(false)

  return { isActive, toggle, destroy }
}

export default useSidebar
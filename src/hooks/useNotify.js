import { useState } from "react"

const useNotify = () => {

  const [notify, setNotify] = useState([
    { id: 7, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: false},
    { id: 6, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: false},
    { id: 5, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: false},
    { id: 4, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: true},
    { id: 3, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: true},
    { id: 2, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: true},
    { id: 1, title: "Notification Type", text: "When couples start thinking about their wedding pla....", seen: true},
  ])

  const getAll = () => notify

  const set = data => setNotify([...notify, ...data])

  return { getAll, set }
}

export default useNotify
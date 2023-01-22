import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import useDevice from "../hooks/useDevice"

export default function Faq() {

  const auth = useContext(AuthContext)

  const device = useDevice()

  const list = [
    {
      folder: "Section 1",
      questions: [
        {id: 1, title: "Question 1.1", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 2, title: "Question 1.2", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 3, title: "Question 1.3", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
      ]
    },
    {
      folder: "Section 2",
      questions: [
        {id: 4, title: "Question 2.1", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 5, title: "Question 2.2", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 6, title: "Question 2.3", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 7, title: "Question 2.4", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
      ]
    },
    {
      folder: "Section 3",
      questions: [
        {id: 8, title: "Question 3.1", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 9, title: "Question 3.2", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 10, title: "Question 3.3", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
      ]
    },
    {
      folder: "Section 4",
      questions: [
        {id: 11, title: "Question 4.1", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 12, title: "Question 4.2", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 13, title: "Question 4.3", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 14, title: "Question 4.4", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 15, title: "Question 4.5", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 16, title: "Question 4.6", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
        {id: 17, title: "Question 4.7", answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."},
      ]
    }
  ]

  const scrollTo = to => {
    const selector = document.querySelector(`[data-to="${to}"]`)
    
    if(!selector) return

    const { offsetTop } = selector

    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth"
    })
  }

  const content = () => {
    return (
      <div className="faq__content">
        <h3>FAQ</h3>
        <div className="faq__inner">
          <div className="faq__body">
            <div className="faq__folder folder-faq">
              {
                list.map(item => (
                  <div className="folder-faq__item" key={item.folder}>
                    <h4 className="folder-faq__title">{ item.folder }</h4>
                    <div className="folder-faq__list">
                      {
                        item.questions.map(question => (
                          <div className="folder-faq__inner" data-to={question.id} key={question.title}>
                            <h5>{ question.title }</h5>
                            <p>{ question.answer }</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {
            !device.isMobile && (
              <div className="faq__menu menu-faq">
                {
                  list.map(item => (
                    <div className="menu-faq__item" key={ item.folder }>
                      <h4 className="menu-faq__title">{ item.folder }</h4>
                      <ul className="menu-faq__list">
                        {
                          item.questions.map(question => <li className="menu-faq__text" key={ question.title } onClick={() => scrollTo(question.id)}>{ question.title }</li>)
                        }
                      </ul>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
        <Link className="faq__btn" to="/help">Contact Us</Link>
      </div>
    ) 
  }

  return (
    <section className="faq">
      { auth.isAuth ? content() : <div className="container">{ content() }</div> }
    </section>
  )
}
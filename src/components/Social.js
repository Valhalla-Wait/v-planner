const Social = ({ columnGap = 20 }) => {
  return (
    <ul className="social__list" style={{ columnGap }}>
      <li className="social__item">
        <a className="social__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <i className="icon-facebook"></i>
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <i className="icon-instagram"></i>
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <i className="icon-youtube"></i>
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://twitter.com/" target="_blank" rel="noreferrer">
          <i className="icon-twitter"></i>
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
          <i className="icon-tiktok"></i>
        </a>
      </li>
    </ul>
  )
}

export default Social
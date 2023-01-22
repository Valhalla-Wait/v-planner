export const GalleryGrid = ({ children }) => {
  return (
    <div className="gallery-grid">{ children }</div>
  )
}

export const GalleryGridCell = ({ children }) => {
  return (
    <div className="gallery-grid__cell">{ children }</div>
  )
}

export const GalleryGridImg = (props) => {
  return (
    <img className="gallery-grid__img" alt="" {...props} />
  )
}
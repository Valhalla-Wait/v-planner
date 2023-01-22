const Button = ({ type, children, ...props }) => {

  return (
    <button {...props}>{ children }</button>
  )
}

export default Button
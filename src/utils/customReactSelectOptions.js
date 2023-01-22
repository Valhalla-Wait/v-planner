export const customReactSelectOptions = (currentTheme) => ({
  components: {
    IndicatorSeparator: () => null,
    Option: ({ isDisabled, isSelected, isMulti, innerRef, children, innerProps, ...props}) => {

      const classNames = ["custom-select__option"]

      if(isSelected) classNames.push("active")
      
      if(isMulti) classNames.push("multi")

      return (
        <div {...innerProps} className={classNames.join(" ")}>
          <span className="custom-select__icon">
            {
              !isMulti && isSelected && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15Z" fill="#3259E3"/>
                </svg>
              )
            }
            {
              !isMulti && !isSelected && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18Z" fill="#6F6C90"/>
                </svg>
              )
            }
          </span>{ children }
        </div>
      )
    }
  },
  theme: theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: currentTheme === "dark" ? "#18181A" : "#FFFFFF",
      primary: currentTheme === "dark" ? "#771CA2" : "#3259E3",
    },
  }),
  styles: {
    container: (styles) => ({
      ...styles,
      borderRadius: 8,
    }),
    control: (styles, state) => {

      let backgroundColor = "#FFFFFF"

      if(currentTheme === "dark"){
        backgroundColor = "#18181A"
      }

      if(currentTheme !== "dark" && state.menuIsOpen){
        backgroundColor = "#FFFFFF"
      }

      if(currentTheme !== "dark" && !state.menuIsOpen){
        backgroundColor = "#F8F9FD"
      }

      return {
        ...styles,
        marginTop: 7,
        borderRadius: 8,
        backgroundColor,
        border: "1px solid #DEDFE9",
        minHeight: 40,
        marginBottom: 16,
        zIndex:  state.menuIsOpen ? 2 : 0,
        "&:hover": {
          borderColor: "#DEDFE9"
        },
        "& *": {
          color: "#86858E"
        },
        fontSize: "14px"
      }
    },
    menu: (styles) => ({
      ...styles,
      border: "1px solid rgb(222, 223, 233)",
      boxShadow: currentTheme === "dark" ? "0 0 0 0" : "0px 13px 30px -11px",
      marginTop: -40,
      overflow: "hidden",
      backgroundColor: currentTheme === "dark" ? "#18181A" : "#FFFFFF",
      borderRadius: 8,
      animation: ".6s ease-in-out 0s visible-dropdown"
    }),
    menuList: (styles) => ({
      ...styles,
      paddingTop: 40,
      paddingBottom: 0,
      borderRadius: "0 0 8px 8px",
      maxHeight: "180px"
    }),
    multiValue: (style) => ({
      ...style,
      backgroundColor: currentTheme === "dark" ? "#771CA2" : "#4367E6",
      borderRadius: "10px",
      overflow: "hidden",
      "& *": {
        color: currentTheme === "dark" ? "inherit" : "#FFFFFF!important"
      }
    }),
    multiValueRemove: (style) => ({
      ...style,
      "&:hover": {
        backgroundColor: "#EB2D24"
      }
    })
  }
})
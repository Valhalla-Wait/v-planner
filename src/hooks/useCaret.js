const useCaret = () => {
  const getCaret = el => { 
    if (el.selectionStart) { 
      return el.selectionStart
    } else if (document.selection) { 
      el.focus()
   
      var r = document.selection.createRange()
      if (r == null) { 
        return 0
      } 
   
      var re = el.createTextRange(), 
          rc = re.duplicate()
      re.moveToBookmark(r.getBookmark())
      rc.setEndPoint('EndToStart', re)
   
      return rc.text.length
    }  
    return 0
  }

  const getPosInRow = el => {
    var caret = getCaret(el)
    var text = el.value.substr(0, caret).replace(/^(.*[\n\r])*([^\n\r]*)$/, '$2')
    return text.length
  }

  return { getCaret, getPosInRow }
}

export default useCaret
import { useState } from "react"
import Button from "../../components/UI/Button"
import useCaret from "../../hooks/useCaret"
import useDevice from "../../hooks/useDevice"
import Picker from 'emoji-picker-react'
import { allowerImageType, allowerVideoType } from "../../utils/allowedFileTypes"

export default function ChatForm({ onCallback }) {

  const [message, setMessage] = useState("")
  const [file, setFile] = useState(null)
  const [src, setSrc] = useState(null)
  const [caretPosition, setCaretPosition] = useState(0)
  const [openEmoji, setOpenEmoji] = useState(false)
  
  const { isMobile } = useDevice()
  const { getCaret } = useCaret()

  const onEmojiClick = (event, emojiObject) => {
    const length = message.length
    setMessage(message.substr( 0, caretPosition ) + emojiObject.emoji + message.substr(caretPosition))
    setCaretPosition(length + emojiObject.emoji.length)
  }

  const send = e => {
    e.preventDefault()

    if(!file && !message.trim("")) return

    onCallback({
      id: Math.floor(Math.random() * 100000),
      type: !file ? "textMessage" : "fileMessage",
      message: file ? file : message.trim(""),
      time: "12:05pm",
      isRecipient: false
    })
    setFile(null)
    setMessage("")
    setCaretPosition(0)
  }

  const onChangeFile = e => {
    if (e.target.files && e.target.files.length) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setFile(null);
    // setFile(e.target.files.length ? e.target.files[0] : null)
  }

  return (
    <form className="body-chat__form form-body-chat">
      <div className="form-body-chat__input">
        <label className="form-body-chat__icon">
          <i className="icon-photo-add-outline"></i>
          <input
            onInput={onChangeFile}
            type="file"
            style={{display: "none"}}
            accept={[...allowerImageType, ...allowerVideoType]}
            // onChange={onChangeFile}
          />
        </label>
        <input
          type="text"
          value={message}
          onKeyUp={e => setCaretPosition(getCaret(e.target))}
          onClick={e => setCaretPosition(getCaret(e.target))}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <div className="form-body-chat__icon" onClick={() => setOpenEmoji(!openEmoji)}>
          <i className="icon-smile"></i>
        </div>
        {
          isMobile && (
            <Button
              className="btn form-body-chat__icon"
              onClick={send}
            ><i className="icon-send"></i></Button>
          )
        }
      </div>
      {
        !isMobile && (
          <Button
            className="btn btn-light btn-send"
            onClick={send}
          >Send <i className="icon-send"></i></Button>
        )
      }
      <div className={openEmoji ? "form-body-chat__emoji active" : "form-body-chat__emoji"}>
        <Picker
          onEmojiClick={onEmojiClick}
          disableSearchBar={true}
        />
      </div>
    </form>
  )
}
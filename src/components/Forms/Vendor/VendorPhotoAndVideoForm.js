import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { allowerImageType, allowerVideoType } from "../../../utils/allowedFileTypes"
import Button from "../../UI/Button"
import Input from "../../UI/Input"

const VendorPhotoAndVideoForm = ({ onCallback, onBack }) => {

  const {
    register,
    formState: { isValid },
    handleSubmit
  } = useForm({
    mode: "all"
  })

  const [drag, setDrag] = useState(false)
  const [files, setFiles] = useState([])
  const [readFiles, setReadFiles] = useState([])

  const onDragStart = e => {
    e.preventDefault()
    setDrag(true)
  }

  const onDragLeave = e => {
    e.preventDefault()
    setDrag(false)
  }

  const onDragOver = e => {
    e.preventDefault()
    setDrag(true)
  }

  const onDrop = e => {
    e.preventDefault()
    setFiles(prev => [...prev, ...e.dataTransfer.files])
  }

  const addFiles = e => {
    setFiles(prev => [...prev, ...e.target.files])
  }

  useEffect(() => {
    setReadFiles([])
    let count = 0
    files.forEach(file => readFile(file, result => {
      if(count < 10){
        setReadFiles(prev => [...prev, result])
      }
      count++
    }))
  }, [files])

  const readFile = (file, callback) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      callback({
        src: e.target.result,
        type: file.type
      })
    }
    reader.readAsDataURL(file)
  }
  
  const onSubmit = () => {
    onCallback(files)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        className="file-upload"
        onDragStart={onDragStart}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={readFiles.length < 10 ? onDrop : e => e.preventDefault()}
      >
        <div className="file-upload__icon">
          <i className="icon-photo-add"></i>
        </div>
        <div className="file-upload__title">Upload Cover Photo or Video</div>
        <div className="file-upload__subtitle">You can upload photo and video formats</div>
        <Input
          type="file"
          className="photo-add__input"
          multiple
          accept={[...allowerImageType, ...allowerVideoType]}
          id="company_photos_and_videos"
          register={{...register("company_photos_and_videos")}}
          onInput={addFiles}
        />
      </label>
      <div className="file-upload__content">
        <div className="file-upload__list">
          {
            readFiles.map((file, i) => (
              <div className="file-upload__item active" key={i}>
                { (file.type.indexOf("image") === 0) && <img className="file-upload__file" src={file.src} alt="" /> }
                { (file.type.indexOf("video") === 0) && <video className="file-upload__file" src={file.src}></video> }
                <div className="file-upload__remove" onClick={() => {
                  setFiles(files.filter((_, idx) => i !== idx))
                }}>
                  <i className="icon-trash"></i>
                </div>
              </div>
            ))
          }
          {
            readFiles.length < 10 && (
              <div className="file-upload__item">
                <label className="file-upload__plus" htmlFor="company_photos_and_videos"><i className="icon-times"></i></label>
              </div>
            )
          }
        </div>
        <div className="file-upload__info">Maximum 10 photo and video</div>
      </div>
      <div className="input-row">
        <div
          className="btn btn-accent btn-circle m-t-24"
          onClick={onBack}
        >
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
        >Next</Button>
      </div>
    </form>
  )
}

export default VendorPhotoAndVideoForm
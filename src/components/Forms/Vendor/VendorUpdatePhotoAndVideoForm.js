import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../../../context/AuthContext"
import { allowerImageType, allowerVideoType } from "../../../utils/allowedFileTypes"
import Button from "../../UI/Button"
import Input from "../../UI/Input"

const VendorUpdatePhotoAndVideoForm = () => {

  const {
    register,
    formState: { isValid },
    handleSubmit
  } = useForm({
    mode: "all"
  })

  const auth = useContext(AuthContext)

  const [files, setFiles] = useState([])
  const [readFiles, setReadFiles] = useState(auth.user.files)
  const [firstRender, setFirstRender] = useState(true)

  const onDragStart = e => e.preventDefault()
  const onDragLeave = e => e.preventDefault()
  const onDragOver = e => e.preventDefault()

  const onDrop = e => {
    e.preventDefault()
    const sliceLength = readFiles.length - 10
    if(!sliceLength) return
    const result = [...e.dataTransfer.files].slice(0, -sliceLength)
    setFiles(prev => [...prev, ...result])
  }

  const addFiles = e => {
    const sliceLength = readFiles.length - 10
    if(!sliceLength) return
    const result = [...e.target.files].slice(0, -sliceLength)
    setFiles(prev => [...prev, ...result])
  }

  useEffect(() => {
    if(!firstRender && readFiles.length < 10) setReadFiles([])
    setFirstRender(false)
    let count = 0
    if(readFiles.length >= 10) return
    files.forEach(file => readFile(file, result => {
      if(count < 10){
        setReadFiles(prev => [...prev, result])
      }
      count++
    }))
  }, [files])

  const readFile = (file, callback) => {
    if(file instanceof File){
      const reader = new FileReader()
      reader.onload = function (e) {
        callback({
          src: e.target.result,
          type: file.type.split("/")[0],
          name: file.name,
          size: file.size
        })
      }
      reader.readAsDataURL(file)
      return
    }
    callback({
      src: file.src,
      type: file.type
    })
  }
  
  const onSubmit = () => {
    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        blocks: {
          ...auth.user.profile.blocks,
          files: !!readFiles.length
        }
      },
      files: [...readFiles]
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="files">
      <h4>Photo and Video</h4>
      <div className="m-t-24">
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
                  { (file.type === "image") && <img className="file-upload__file" src={file.src} alt="" /> }
                  { (file.type === "video") && <video className="file-upload__file" src={file.src}></video> }
                  <div className="file-upload__remove" onClick={() => {
                    if(file.id){
                      setReadFiles(readFiles.filter(_ => _.id !== file.id))
                    }else{
                      setReadFiles(readFiles.filter(_ => _.name !== file.name && _.size !== file.size))
                      setFiles(files.filter(_ => _.name !== file.name && _.size !== file.size))
                    }
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
      </div>
      <Button
        className="btn btn-accent m-t-24"
        disabled={!isValid}
      >Save</Button>
    </form>
  )
}

export default VendorUpdatePhotoAndVideoForm
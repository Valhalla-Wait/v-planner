import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../../../context/AuthContext"
import { ModalContext } from "../../../context/ModalContext";
import { addVendorPhoto } from "../../../Store/Actions/vendorPhotoAction";
import { deleteVendorPhoto } from "../../../Store/Actions/vendorPhotoAction";
import { allowerImageType, allowerVideoType } from "../../../utils/allowedFileTypes"
import { checkFileType } from "../../../utils/checkFileType"
import TextModal from "../../Modals/TextModal";
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

  const modal = useContext(ModalContext)
  const user = useSelector(user => user.userInfo.userData)
  const photosAndVideos = user.vendorModel.photos.filter(el => el.type === "PHOTO_AND_VIDEOS")
  const [files, setFiles] = useState(photosAndVideos)
  const [newFiles, setNewFiles] = useState([])
  const [filesToDelete, setFilesToDelete] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([])
  const dispatch = useDispatch()

  const onDragStart = e => e.preventDefault()
  const onDragLeave = e => e.preventDefault()
  const onDragOver = e => e.preventDefault()

  const onDrop = e => {
    e.preventDefault()
    const sliceLength = files.length - 10
    if (!sliceLength) return
    const result = [...e.dataTransfer.files].slice(0, -sliceLength)
    result.forEach(file => readFile(file, result => {
      setNewFiles(prev => [...prev, result])
    }))
  }

  const addFiles = e => {
    const sliceLength = files.length + newFiles.length - 10
    if (!sliceLength) return
    const result = [...e.target.files].slice(0, -sliceLength)
    result.forEach(file => {
      const id = uuid();
      setFilesToUpload(prev => [...prev, { id: id, file: file }])
      readFile(id, file, result => {
        setNewFiles(prev => [...prev, result])
      })
    })

  }

  // useEffect(() => {
  //   if (!firstRender && readFiles.length < 10) {
  //     console.log('files:', files)
  //     setReadFiles([])
  //   }
  //   setFirstRender(false)
  //   let count = 0
  //   if (readFiles.length >= 10) return
  //   files.forEach(file => readFile(file, result => {
  //     if (count < 10) {
  //       setReadFiles(prev => [...prev, result])
  //     }
  //     count++
  //   }))
  // }, [files])

  const readFile = (id, file, callback) => {
    if (file instanceof File) {
      const reader = new FileReader()
      reader.onload = function (e) {
        callback({
          id: id,
          src: e.target.result,
          type: file.type.split("/")[0],
          name: file.name,
          size: file.size
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const promises = filesToUpload.map(item => dispatch(addVendorPhoto(item.file, "PHOTO_AND_VIDEOS")))
    promises.push(...filesToDelete.map(id => dispatch(deleteVendorPhoto(id))))
    Promise.all(promises)
      .then(() => {
        modal.start()
        modal.setContent(<TextModal text="Changes have been saved" />)
      })
      .catch((err) => {
        console.log(err)
        modal.start()
        modal.setContent(<TextModal text={err.message} />)
      })
  }

  return (
    <form onSubmit={onSubmit} data-to="files">
      <h4>Photo and Video</h4>
      <div className="m-t-24">
        <label
          className="file-upload"
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={files.length < 10 ? onDrop : e => e.preventDefault()}
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
            register={{ ...register("company_photos_and_videos") }}
            onInput={addFiles}
          />
        </label>
        <div className="file-upload__content">
          <div className="file-upload__list">
            {
              files.map((file, i) => (
                <div className="file-upload__item active" key={i}>
                  {(checkFileType(file.url) === "image") && <img className="file-upload__file" src={file.url} alt="" />}
                  {(checkFileType(file.url) === "video") && <video className="file-upload__file" src={file.url}></video>}
                  <div className="file-upload__remove" onClick={() => {
                    setFiles(prevState => prevState.filter(item => item.id !== file.id))
                    setFilesToDelete(prev => [...prev, file.id])
                  }}>
                    <i className="icon-trash"></i>
                  </div>
                </div>
              ))
            }
            {
              newFiles.map((file, i) => (
                <div className="file-upload__item active" key={i}>
                  {file.type.includes("image") && <img className="file-upload__file" src={file.src} alt="" />}
                  {file.type.includes("video") && <video className="file-upload__file" src={file.src}></video>}
                  <div className="file-upload__remove" onClick={() => {
                    setNewFiles(prev => prev.filter(item => item.id !== file.id))
                    setFilesToUpload(prev => prev.filter(item => item.id !== file.id))
                  }}>
                    <i className="icon-trash"></i>
                  </div>
                </div>
              ))
            }
            {
              files.length + newFiles.length < 10 && (
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
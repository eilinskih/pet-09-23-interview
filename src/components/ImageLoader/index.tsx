import React, { type ChangeEvent, useRef, useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { isFileImage, getCropImageURl } from './utils'
import { useAppDispatch, useAppSelector } from '../../hooks/typedReact-ReduxHooks'
import {
  deleteUserPhoto,
  uploadUserPhoto,
  userLoadersSelector,
  userSelector
} from '../../redux/reducer/user'
import { type Nullable } from '../../types'

import IconEdit from '../icons/IconEdit'
import IconTrashCan from '../icons/IconTrashCan'
import IconCamera from '../icons/IconCamera'
import Close from '../icons/Close'
import Loader from '../icons/Loader'

import styles from './image_loader.module.scss'

const ImageLoader = () => {
  const imageRef = useRef(null)
  const [editedImage, setEditedImage] = useState<Nullable<Blob>>(null)
  const [imageSrc, setImageSrc] = useState<Nullable<string>>(null)
  const userData = useAppSelector(userSelector)

  const [showModal, setShowModal] = useState(false)
  const [imageSizeError, setImageSizeError] = useState(false)
  const { photo: photoLoader } = useAppSelector(userLoadersSelector)

  const [crop, setCrop] = useState<Crop>({
    unit: '%' as const,
    x: 0,
    y: 0,
    width: 100,
    height: 100
  })
  const dispatch = useAppDispatch()

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImageSizeError(false)

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      const file = e.target.files?.[0]
      reader.addEventListener('load', () => {
        if (isFileImage(file)) {
          if (Number((file.size / 1e6).toFixed(2)) > 5) setImageSizeError(true)
          setImageSrc(reader.result as string)
          setShowModal(true)
        } else {
          console.error('not image')
        }
      })

      reader.readAsDataURL(file)
    }
  }

  const getCroppedImg = async (image: HTMLImageElement, cropValue: Crop) => {
    const url = await getCropImageURl(image, cropValue) as Blob
    setEditedImage(url)
  }

  const makeClientCrop = (cropValue: Crop) => {
    if (imageRef.current && cropValue.width && cropValue.height) {
      void getCroppedImg(imageRef.current, cropValue)
    }
  }

  const onCropComplete = (cropValue: Crop) => {
    makeClientCrop(cropValue)
  }
  const onCropChange = (cropValue: Crop) => {
    setCrop(cropValue)
  }

  const uploadImage = async () => {
    try {
      const formData = new FormData()
      formData.append('photo', editedImage as Blob)
      dispatch(uploadUserPhoto(formData))
      setImageSrc('')
    } catch (err) {
      console.error(err)
    }
  }

  const cropSaveHandler = () => {
    void uploadImage()
  }

  const deleteProfileImage = () => {
    dispatch(
      deleteUserPhoto()
    )
  }

  const onImageLoad = () => {
    makeClientCrop(crop)
    setCrop({
      unit: 'px' as const,
      x: 0,
      y: 0,
      width: 100,
      height: 100
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.wrap_img}>
          {(userData.photoUrl && <img src={userData.photoUrl} width={100} height={100} alt="" />) ??
          (
            <span className={styles.text}>{userData.username?.slice(0, 1)}</span>
          )}
        </div>
        {photoLoader && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}
        {userData.photoUrl && (
          <div className={styles.wrapDelete}>
            <div className={styles.deleteContainer}>
              <div className={styles.delete} onClick={deleteProfileImage}>
                <IconTrashCan />
              </div>
            </div>
          </div>
        )}
        <label htmlFor="avatar-input" className={styles.loadBtn}>
          {userData.photoUrl ? <IconEdit /> : <IconCamera />}

          <input
            type="file"
            id="avatar-input"
            onChange={onSelectFile}
            accept="image/png, image/gif, image/jpeg"
          />
        </label>
      </div>

      {imageSizeError && (
        <span className={styles.errorMessage}>The image size should be less than 5 Mb</span>
      )}

      {imageSrc && !imageSizeError && showModal && (
        <>
          <div className={styles.modalWrapper} onClick={() => { setShowModal(false) }} />
          <div className={styles.crop}>
            <button type="button"
            className={styles.close}
            onClick={() => { setImageSrc('') }}
            >
              <Close />
            </button>
            <div className={styles.content}>
              <div className={styles.canvas}>
                <ReactCrop
                  className={styles.cropper}
                  crop={crop}
                  ruleOfThirds
                  onComplete={onCropComplete}
                  onChange={onCropChange}
                  aspect={1}
                >
                  <img ref={imageRef} src={imageSrc} onLoad={onImageLoad} alt="" />
                </ReactCrop>
              </div>
              <div className={styles.footer}>
                <button
                type="button"
                className={styles.save}
                onClick={cropSaveHandler}>
                  save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageLoader

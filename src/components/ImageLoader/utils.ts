import { type Crop } from 'react-image-crop'

export const isFileImage = (file: File) => {
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
  const fileType = file?.type
  validImageTypes.includes(fileType)

  return validImageTypes.includes(fileType)
}

export const getCropImageURl = async (image: HTMLImageElement, cropValue: Crop) => {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = cropValue.width
  canvas.height = cropValue.height
  const ctx = canvas.getContext('2d')

  ctx?.drawImage(
    image,
    cropValue.x * scaleX,
    cropValue.y * scaleY,
    cropValue.width * scaleX,
    cropValue.height * scaleY,
    0,
    0,
    cropValue.width,
    cropValue.height
  )
  const canvasBlob = await new Promise((resolve) => canvas.toBlob(resolve))
  console.log(canvasBlob)
  return canvasBlob
}

import { NError } from '@configs/const.config'
import { MIME_TYPES } from '@utils/mime-type'
import { notification } from 'antd'
import { RcFile } from 'antd/lib/upload'

export const beforeUpload = (file: RcFile) => {
  const isAccess = [
    MIME_TYPES.jpg,
    MIME_TYPES.jpeg,
    MIME_TYPES.png,
    MIME_TYPES.gif,
    MIME_TYPES.mp4,
    MIME_TYPES.movie,
    MIME_TYPES.avi,
    MIME_TYPES.flv,
    MIME_TYPES.webm,
    MIME_TYPES.mts,
    MIME_TYPES.mpeg,
    MIME_TYPES.csv,
    MIME_TYPES.pdf,
    MIME_TYPES.doc,
    MIME_TYPES.docx,
    MIME_TYPES.xls,
    MIME_TYPES.xlsx,
    MIME_TYPES.ppt,
    MIME_TYPES.pptx,
    MIME_TYPES.txt,
    MIME_TYPES.xml,
    MIME_TYPES.odt,
    MIME_TYPES.ods,
    MIME_TYPES.mp3,
    MIME_TYPES.wav,
    MIME_TYPES.wma,
    MIME_TYPES.acc,
  ].includes(file.type)

  if (!isAccess) {
    notification.error({
      message: NError,
      description: 'アップロードが許可されていないファイル形式です。',
    })
  }

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    notification.error({
      message: NError,
      description: 'ファイルは 10MB 未満である必要があります。',
    })
  }

  return !!isLt2M && isAccess
}

export const beforeUploadAttachedFilesTask = (file: RcFile) => {
  const isAccess = [MIME_TYPES.pdf].includes(file.type)
  if (!isAccess) {
    notification.error({
      message: NError,
      description: 'アップロードが許可されていないファイル形式です。',
    })
  }
  const isLtM = file.size / 1024 / 1024 < 10
  if (!isLtM) {
    notification.error({
      message: NError,
      description: 'ファイルは10MB未満である必要があります。',
    })
  }
  return isLtM && isAccess
}

export const beforeUploadFile = (file: RcFile, mimeTypes: string[], maxFileSize: number) => {
  const isAccess = mimeTypes.includes(file.type)
  if (!isAccess)
    notification.error({
      message: NError,
      description: 'アップロードが許可されていないファイル形式です。',
    })

  const isLtM = file.size / 1024 / 1024 < maxFileSize
  if (!isLtM)
    notification.error({
      message: NError,
      description: `ファイルは${maxFileSize}MB未満である必要があります。`,
    })

  return isLtM && isAccess
}

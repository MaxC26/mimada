import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IconPhoto, IconUpload, IconX, IconAlertTriangle } from '@tabler/icons-react'

const ImageUploader = ({ setFieldValue, nameFile, setNameFile, setFile, valueName }) => {
  const inputRef = useRef(null)
  const [fileValid, setFileValid] = useState(true)
  const [previewUrl, setPreviewUrl] = useState(null)
  const maxSize = 5 * 1024 * 1024 // 5 MB

  const acceptedTypes = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png':  ['.png'],
    'image/webp': ['.webp'],
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    multiple: false,
    maxSize,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) handleAcceptedFile(acceptedFiles[0])
    },
    onDropRejected: () => {
      const exts = Object.values(acceptedTypes).flat().join(', ')
      setNameFile(`Solo se aceptan: ${exts} (máx. 5MB)`)
      setFileValid(false)
      setFieldValue(valueName, null)
      setPreviewUrl(null)
    },
  })

  const handleAcceptedFile = (file) => {
    setFieldValue(valueName, file)
    setNameFile(file.name)
    setFileValid(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
      setFile(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const validMimeTypes = Object.keys(acceptedTypes)
    const validExtensions = Object.values(acceptedTypes).flat()
    if (file.size > maxSize) {
      setNameFile('El tamaño máximo permitido es 5MB.')
      setFileValid(false)
      setFieldValue(valueName, null)
      setFile(null)
      setPreviewUrl(null)
    } else if (!validMimeTypes.includes(file.type) && !validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setNameFile(`Solo se aceptan: ${validExtensions.join(', ')}`)
      setFileValid(false)
      setFieldValue(valueName, null)
      setFile(null)
      setPreviewUrl(null)
    } else {
      handleAcceptedFile(file)
    }
  }

  const handleRemoveFile = () => {
    setFieldValue(valueName, null)
    setFile(null)
    setNameFile('')
    setFileValid(true)
    setPreviewUrl(null)
  }

  return (
    <div className='w-full'>
      {/* ── Dropzone ── */}
      <div
        {...getRootProps()}
        className={`w-full rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer p-6 text-center
          ${isDragActive
            ? 'border-[#c2a381] bg-[#faf7f5]'
            : fileValid
              ? 'border-gray-200 hover:border-[#c2a381]/60 hover:bg-[#faf7f5]/40'
              : 'border-red-300 bg-red-50'
          }`}
      >
        <input {...getInputProps({ onChange: handleInputChange, ref: inputRef })} />

        <div className='flex flex-col items-center gap-3 py-4'>
          {isDragActive ? (
            <>
              <div className='w-14 h-14 rounded-full bg-[#faf7f5] flex items-center justify-center text-[#c2a381]'>
                <IconUpload size={26} stroke={1.5} />
              </div>
              <p className='text-sm font-semibold text-[#c2a381]'>Suelta la imagen aquí...</p>
            </>
          ) : (
            <>
              <div className='w-14 h-14 rounded-full bg-[#faf7f5] flex items-center justify-center text-[#c2a381]'>
                <IconPhoto size={26} stroke={1.5} />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-semibold text-gray-700'>
                  Arrastra y suelta una imagen o haz clic para seleccionarla
                </p>
                <p className='text-xs text-gray-400'>PNG, JPG, o WEBP (máx. 5MB)</p>
              </div>
              <button
                type='button'
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                className='mt-1 px-6 py-2 rounded-full bg-[#c2a381] text-white text-sm font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-colors flex items-center gap-2'
              >
                <IconUpload size={15} />
                Seleccionar imagen
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Preview / Error ── */}
      {nameFile && (
        <div className={`mt-3 rounded-xl border p-3 flex items-center justify-between gap-3 ${fileValid ? 'border-[#f3ece5] bg-[#faf7f5]/60' : 'border-red-200 bg-red-50'}`}>
          <div className='flex items-center gap-3 min-w-0'>
            {fileValid ? (
              previewUrl ? (
                <div className='h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-[#f3ece5]'>
                  <img src={previewUrl} alt='Vista previa' className='h-full w-full object-cover' />
                </div>
              ) : (
                <div className='h-12 w-12 shrink-0 rounded-lg bg-[#faf7f5] flex items-center justify-center text-[#c2a381]'>
                  <IconPhoto size={20} stroke={1.5} />
                </div>
              )
            ) : (
              <div className='h-12 w-12 shrink-0 rounded-lg bg-red-100 flex items-center justify-center text-red-500'>
                <IconAlertTriangle size={20} stroke={1.5} />
              </div>
            )}
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-gray-700 truncate'>{nameFile}</p>
              {fileValid && previewUrl && (
                <p className='text-xs text-[#c2a381] font-medium mt-0.5'>Imagen lista para subir ✓</p>
              )}
              {!fileValid && (
                <p className='text-xs text-red-500 mt-0.5'>Archivo no válido</p>
              )}
            </div>
          </div>
          <button
            type='button'
            onClick={handleRemoveFile}
            className='shrink-0 text-gray-400 hover:text-red-400 transition-colors p-1'
            aria-label='Eliminar archivo'
          >
            <IconX size={18} stroke={2} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUploader

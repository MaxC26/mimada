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
    'image/png': ['.png'],
    'image/webp': ['.webp'],
  }

  // Configuración del hook useDropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    multiple: false,
    maxSize,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleAcceptedFile(acceptedFiles[0])
      }
    },
    onDropRejected: (rejections) => {
      const validExtensions = Object.values(acceptedTypes).flat()
      const allowedFormats = validExtensions.join(', ')
      setNameFile(`Solo se aceptan: ${allowedFormats} (máx. 5MB)`)
      setFileValid(false)
      setFieldValue(valueName, null)
      setPreviewUrl(null)
    },
  })

  const handleAcceptedFile = (file) => {
    setFieldValue(valueName, file)
    handleFileUpload(file)
    setNameFile(file.name)
    setFileValid(true)

    // Generar vista previa de la imagen
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleFileUpload = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64File = reader.result
      setFile(base64File)
    }
  }

  // Manejar archivos seleccionados con el input
  const handleInputChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const validExtensions = Object.values(acceptedTypes).flat()
      const validMimeTypes = Object.keys(acceptedTypes)

      // Validar tamaño
      if (file.size > maxSize) {
        setNameFile(`El tamaño máximo permitido es 5MB.`)
        setFileValid(false)
        setFieldValue(valueName, null)
        setFile(null)
        setPreviewUrl(null)
      }
      // Validar MIME type y extensión
      else if (
        !validMimeTypes.includes(file.type) &&
        !validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      ) {
        const allowedFormats = validExtensions.join(', ')
        setNameFile(`Solo se aceptan: ${allowedFormats}`)
        setFileValid(false)
        setFieldValue(valueName, null)
        setFile(null)
        setPreviewUrl(null)
      }
      // Archivo válido
      else {
        handleAcceptedFile(file)
      }
    }
  }

  // Eliminar archivo
  const handleRemoveFile = () => {
    setFieldValue(valueName, null)
    setFile(null)
    setNameFile('')
    setFileValid(true)
    setPreviewUrl(null)
  }

  return (
    <div className='w-full max-w-[90vw] sm:max-w-none mx-auto overflow-hidden mt-4'>
      {/* Área de Dropzone */}
      <div
        {...getRootProps()}
        className={`
          w-full rounded-lg border-2 border-dashed transition-all duration-200
          ${
            isDragActive
              ? 'border-primary bg-black/10'
              : 'border-base-300 hover:border-black/50'
          } 
          ${fileValid ? '' : 'border-error bg-error/10'}
          cursor-pointer p-4 text-center
        `}
      >
        <input {...getInputProps({ onChange: handleInputChange, ref: inputRef })} />

        <div className='flex flex-col items-center justify-center gap-2 py-4'>
          {isDragActive ? (
            <>
              <IconUpload
                className='h-12 w-12 text-primary animate-bounce'
                stroke={1.5}
              />
              <p className='text-sm font-medium'>Suelta la imagen aquí...</p>
            </>
          ) : (
            <>
              <IconPhoto className='h-12 w-12 text-base-content/50' stroke={1.5} />
              <div className='space-y-1'>
                <p className='text-sm font-medium'>
                  Arrastra y suelta una imagen o haz clic para seleccionarla
                </p>
                <p className='text-xs text-base-content/70'>
                  PNG, JPG, o WEBP (máx. 5MB)
                </p>
              </div>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
                className='btn btn-neutral btn-sm mt-2'
              >
                <IconUpload size={16} />
                Seleccionar imagen
              </button>
            </>
          )}
        </div>
      </div>

      {/* Vista previa de archivo cargado */}
      {nameFile && (
        <div
          className={`mt-3 rounded-lg border p-3 ${
            fileValid ? 'border-base-300' : 'border-error'
          }`}
        >
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>
              {fileValid ? 'Imagen cargada:' : 'Error:'}
            </span>
            <button
              type='button'
              onClick={handleRemoveFile}
              className='btn btn-ghost btn-sm btn-circle text-error'
              aria-label='Eliminar archivo'
            >
              <IconX stroke={2} />
            </button>
          </div>

          <div className='mt-2 flex items-center gap-3'>
            {fileValid ? (
              previewUrl ? (
                <div className='relative h-14 w-14 overflow-hidden rounded border'>
                  <img
                    src={previewUrl}
                    alt='Vista previa'
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : (
                <div className='flex h-14 w-14 items-center justify-center rounded bg-base-200'>
                  <IconPhoto size={24} className='text-base-content/50' />
                </div>
              )
            ) : (
              <div className='flex h-14 w-14 items-center justify-center rounded bg-error/20'>
                <IconAlertTriangle size={24} className='text-error' />
              </div>
            )}

            <div className='overflow-hidden'>
              <p className='text-sm truncate max-w-[50vw] sm:max-w-full overflow-hidden text-ellipsis'>
                {nameFile}
              </p>
              {fileValid && previewUrl && (
                <p className='text-xs text-base-content/70 mt-1'>
                  Imagen lista para subir
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader


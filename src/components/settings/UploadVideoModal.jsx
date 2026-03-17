import { useState, useRef, useEffect } from 'react'
import Modal from 'react-modal'
import { IconUpload, IconVideo, IconCheck, IconX } from '@tabler/icons-react'

// Bind modal to app element for accessibility
Modal.setAppElement('#root')

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    inset: 'auto',
    border: 'none',
    borderRadius: '1.25rem',
    padding: 0,
    width: '100%',
    maxWidth: '520px',
    background: 'transparent',
    overflow: 'visible',
  },
}

const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded }) => {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setUploadedFile(null)
      setUploadProgress(0)
      setIsUploading(false)
      setIsDragging(false)
    }
  }, [isOpen])

  /* ── Drag & Drop handlers ── */
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) startFakeUpload(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) startFakeUpload(file)
  }

  /* ── Simula subida con progreso ── */
  const startFakeUpload = (file) => {
    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsUploading(false)
      }
      setUploadProgress(progress)
    }, 300)
  }

  const formatBytes = (bytes) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const handleConfirm = () => {
    if (uploadedFile && !isUploading) {
      onVideoUploaded(uploadedFile)
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel='Subir Video'
    >
      <div className='bg-white rounded-2xl shadow-2xl w-full overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 bg-[#faf7f5] rounded-xl flex items-center justify-center text-[#c2a381]'>
              <IconVideo size={20} stroke={1.5} />
            </div>
            <div>
              <h3 className='font-bold text-gray-900 text-base'>Subir Video</h3>
              <p className='text-xs text-gray-400'>MP4, MOV o AVI · Máx. 2 GB</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className='p-6 space-y-4'>
          {/* Drop zone */}
          <div
            className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
              isDragging
                ? 'border-[#c2a381] bg-[#faf7f5]'
                : 'border-gray-200 bg-white hover:border-[#c2a381]/50 hover:bg-[#faf7f5]/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className='w-14 h-14 bg-[#faf7f5] rounded-full flex items-center justify-center text-[#c2a381]'>
              <IconUpload size={26} stroke={1.5} />
            </div>
            <div className='text-center'>
              <p className='font-bold text-gray-800'>Arrastra y suelta tu video aquí</p>
              <p className='text-gray-500 text-sm mt-1'>o haz clic para seleccionar un archivo</p>
            </div>
            <button
              type='button'
              className='mt-1 px-5 py-2 bg-[#c2a381] text-white font-bold rounded-full text-sm hover:bg-[#a58b6c] transition-colors shadow-md'
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
            >
              Seleccionar Archivo
            </button>
            <input
              ref={fileInputRef}
              type='file'
              accept='video/*'
              className='hidden'
              onChange={handleFileSelect}
            />
          </div>

          {/* Progress bar */}
          {uploadedFile && (
            <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <IconVideo size={18} className='text-[#c2a381]' stroke={1.5} />
                  <p className='text-sm font-semibold text-gray-800 truncate max-w-[220px]'>
                    {uploadedFile.name}
                  </p>
                </div>
                {isUploading ? (
                  <span className='text-xs font-bold text-[#c2a381] bg-[#faf7f5] px-3 py-1 rounded-full'>
                    {uploadProgress}%
                  </span>
                ) : (
                  <span className='text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1'>
                    <IconCheck size={13} /> Listo
                  </span>
                )}
              </div>
              <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-[#c2a381] to-[#e3d5c8] rounded-full transition-all duration-300'
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className='text-xs text-gray-400 mt-1.5'>{formatBytes(uploadedFile.size)}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl'>
          <button
            onClick={onClose}
            className='px-5 py-2 rounded-full border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-colors'
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!uploadedFile || isUploading}
            className='px-5 py-2 rounded-full bg-[#c2a381] text-white font-bold text-sm shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0'
          >
            {isUploading ? 'Procesando...' : 'Agregar Lección'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UploadVideoModal

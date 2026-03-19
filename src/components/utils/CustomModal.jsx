import Modal from 'react-modal'

// Bind modal to app element for accessibility

const CustomModal = ({
  isOpen,
  onClose,
  contentLabel = 'Modal',
  maxWidth = '400px',
  children,
}) => {
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
      maxWidth,
      background: 'transparent',
      overflow: 'visible',
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel={contentLabel}
    >
      <div className='bg-white rounded-2xl shadow-2xl w-full overflow-hidden'>
        {children}
      </div>
    </Modal>
  )
}

export default CustomModal


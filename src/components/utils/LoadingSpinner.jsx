const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={className}>
      <span className='loading loading-spinner loading-xl'></span>
    </div>
  )
}

export default LoadingSpinner

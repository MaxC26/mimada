export const UserAvatar = ({
  user,
  initials,
  size = 'md',
  className = '',
  onClick,
}) => {
  const getInitials = () => {
    if (initials) return initials.toUpperCase().substring(0, 2)
    if (user) {
      const first = user.nombre?.charAt(0) || ''
      const last = user.apellido?.charAt(0) || ''
      const res = `${first}${last}`.toUpperCase()
      return res || 'U'
    }
    return 'MC'
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-lg',
  }

  const selectedSize = sizeClasses[size] || size

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center rounded-full bg-gray-900 text-white font-bold shrink-0 ${selectedSize} ${className}`}
    >
      {getInitials()}
    </div>
  )
}

export default UserAvatar

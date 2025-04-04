export const NavItem = ({
  icon,
  text,
  url,
  newActive = false,
  setActivePage,
  setIsLoading,
  activePage,
}) => {
  return (
    <a
      href={`#${url.toLowerCase()}`}
      className={`flex items-center p-3 rounded-lg ${
        newActive
          ? 'text-gray-700 bg-gray-100 font-semibold'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={(e) => {
        e.preventDefault()
        setActivePage(text)
        if (activePage !== text) {
          setIsLoading(true)
        }
      }}
    >
      {icon}
      <span className='ml-3'>{text}</span>
    </a>
  )
}

import { IconShoppingCart, IconStarFilled } from '@tabler/icons-react'

export const CourseCard = ({
  titulo,
  author,
  calificacionPromedio,
  totalCalificaciones,
  duracionTotal,
  precio,
  imagenPortada,
  categoria,
  onClick,
}) => {
  return (
    <div
      className='bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer'
      onClick={onClick}
    >
      {/* Contenedor Superior: Imagen y Badge */}
      <div className='relative h-48 sm:h-56 w-full overflow-hidden'>
        <div
          className='w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105'
          style={{ backgroundImage: `url(${imagenPortada})` }}
        ></div>

        {/* Badge superior izquierdo (Desktop) / Desktop & Mobile */}
        <div className='absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-sm text-[10px] font-bold tracking-wider text-[#c2a381] shadow-sm uppercase'>
          {categoria}
        </div>

        {/* Badge inferior derecho de tiempo (Mobile view mostly, but good for all) */}
        {duracionTotal && (
          <div className='absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white shadow-sm'>
            {duracionTotal}
          </div>
        )}
      </div>

      {/* Contenido Inferior */}
      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2'>
          {titulo}
        </h3>

        <div className='flex items-center gap-2 mb-3'>
          <div className='w-5 h-5 rounded-full bg-gray-200 overflow-hidden'>
            <img
              src='https://i.pravatar.cc/150?img=40'
              alt={author}
              className='w-full h-full object-cover'
            />
          </div>
          <p className='text-gray-500 text-sm'>{author ?? 'Mimada'}</p>
        </div>

        {/* // NOTE - FIX para que muestre las estrellas necesarias */}
        {/* Poner las estrellas dependiendo de la calificación */}
        {/* Ratings */}
        <div className='flex items-center gap-1 mb-4 mt-auto'>
          {/* <IconStarFilled size={14} className='text-[#c2a381] shrink-0' /> */}
          <span className='font-bold text-sm text-gray-700 ml-1'>
            {calificacionPromedio}
          </span>
          {/* NOTE - Use Stars Component */}
          <div className='flex text-[#ffb800] ml-1'>
            <IconStarFilled size={12} />
            <IconStarFilled size={12} />
            <IconStarFilled size={12} />
            <IconStarFilled size={12} />
            <IconStarFilled size={12} />
          </div>
          <span className='text-gray-400 text-xs ml-1'>({totalCalificaciones})</span>
        </div>

        {/* Footer de Tarjeta: Precio y Carrito/Boton */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
          <div className='flex flex-col md:hidden w-full'>
            {/* Layout Móvil: Precio arriba del botón */}
            <div className='flex justify-between items-center mb-3 w-full'>
              <span className='font-bold text-2xl text-[#c2a381] leading-none'>
                ${precio}
              </span>
            </div>
            <button className='w-full bg-[#f3ece5] text-[#c2a381] font-bold py-3 rounded-xl hover:bg-[#c2a381] hover:text-white transition-colors'>
              Ver detalles
            </button>
          </div>

          <div className='hidden md:flex items-center justify-between w-full'>
            {/* Layout Desktop */}
            <div className='flex flex-col'>
              <span className='font-bold text-xl text-gray-900 leading-none'>
                ${precio}
              </span>
            </div>
            <button className='bg-[#f3ece5] text-[#c2a381] w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#c2a381] hover:text-white transition-colors duration-300 shadow-sm'>
              <IconShoppingCart size={20} stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

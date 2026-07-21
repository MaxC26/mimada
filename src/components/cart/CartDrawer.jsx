import {
  IconX,
  IconShoppingCart,
  IconTrash,
  IconShoppingBag,
  IconArrowRight,
} from '@tabler/icons-react'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'

const CartDrawer = () => {
  const { items, total, itemCount, isOpen, closeCart, removeFromCart, clearCart } = useCart()

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[201] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0'>
          <div className='flex items-center gap-2'>
            <IconShoppingCart size={20} className='text-[#c2a381]' stroke={1.8} />
            <h2 className='text-base font-black text-gray-900'>Mi Carrito</h2>
            {itemCount > 0 && (
              <span className='bg-[#faf7f5] text-[#c2a381] text-xs font-bold px-2 py-0.5 rounded-full'>
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className='p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Lista de items */}
        <div className='flex-1 overflow-y-auto px-5 py-4 space-y-3'>
          {items.length === 0 ? (
            /* Estado vacío */
            <div className='flex flex-col items-center justify-center h-full gap-4 py-16 text-center'>
              <div className='w-20 h-20 rounded-full bg-[#faf7f5] flex items-center justify-center'>
                <IconShoppingBag size={36} className='text-[#d8c0a6]' stroke={1.3} />
              </div>
              <div>
                <p className='font-bold text-gray-800 mb-1'>Tu carrito está vacío</p>
                <p className='text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto'>
                  Explora nuestros cursos y agrega los que más te gusten
                </p>
              </div>
              <button
                onClick={closeCart}
                className='mt-2 text-sm font-bold text-[#c2a381] hover:underline flex items-center gap-1'
              >
                Ver cursos
                <IconArrowRight size={15} />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cursoId}
                className='flex gap-3 p-3 bg-[#faf7f5] rounded-2xl group relative'
              >
                {/* Thumbnail */}
                <div className='w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100'>
                  {item.imagenPortada ? (
                    <img
                      src={item.imagenPortada}
                      alt={item.titulo}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-[#f3ece5]'>
                      <IconShoppingBag size={20} className='text-[#c2a381]' stroke={1.5} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-bold text-gray-900 leading-snug truncate pr-6'>
                    {item.titulo}
                  </p>
                  {item.categoria && (
                    <p className='text-[10px] text-[#c2a381] font-semibold mt-0.5 uppercase tracking-wide'>
                      {item.categoria}
                    </p>
                  )}
                  <p className='text-base font-black text-gray-900 mt-1'>
                    ${item.precio.toFixed(2)}
                  </p>
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => removeFromCart(item.cursoId)}
                  className='absolute top-3 right-3 p-1 text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100'
                  title='Eliminar'
                >
                  <IconTrash size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y acciones */}
        {items.length > 0 && (
          <div className='border-t border-gray-100 px-5 py-5 space-y-4 shrink-0'>
            {/* Total */}
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-500 font-medium'>Total</span>
              <span className='text-2xl font-black text-gray-900'>${total.toFixed(2)}</span>
            </div>

            {/* CTA */}
            <button className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-black shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-2'>
              <IconShoppingBag size={16} />
              Proceder al pago
            </button>

            {/* Clear */}
            <button
              onClick={clearCart}
              className='w-full text-xs text-gray-400 hover:text-red-400 font-medium transition-colors py-1'
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer

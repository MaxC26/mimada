import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Navbar } from '../components/nabvar/Navbar'
import Footer from '../components/utils/Footer'
import { routes } from '../utils/rutas'
import {
  IconArrowLeft,
  IconShoppingBag,
  IconTrash,
  IconShieldCheck,
  IconLock,
  IconArrowRight,
} from '@tabler/icons-react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { createPayPalOrder, capturePayPalOrder } from '../services/pagos'
import { toast } from 'sonner'
import SocialLoginButtons from '../components/login/SocialLoginButtons'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, total, itemCount, removeFromCart, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  const handlePaymentSuccess = () => {
    clearCart()
    toast.success('¡Pago exitoso! Disfruta tus nuevos cursos.')
    navigate(routes.explore.cursos)
  }

  return (
    <div className='flex min-h-screen bg-gray-50 flex-col font-sans'>
      <Navbar isExplore={true} />

      <main className='flex-grow w-full pt-20 md:pt-28 pb-16'>
        <div className='max-w-6xl mx-auto px-4 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#c2a381] transition-colors mb-5 group'
            >
              <IconArrowLeft
                size={16}
                className='group-hover:-translate-x-0.5 transition-transform'
              />
              Volver
            </button>

            <h1 className='text-3xl md:text-4xl font-black text-gray-900 leading-tight'>
              Finalizar compra
            </h1>
            <p className='text-gray-500 mt-1'>Revisa tu pedido y completa el pago</p>
          </div>

          {items.length === 0 ? (
            /* ── Estado vacío ── */
            <div className='flex flex-col items-center justify-center py-20 mb-10 bg-white rounded-3xl border border-dashed border-[#c2a381]/40 text-center px-6'>
              <div className='w-20 h-20 rounded-full bg-[#faf7f5] flex items-center justify-center mb-5 text-[#c2a381]'>
                <IconShoppingBag size={36} stroke={1.3} />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                Tu carrito está vacío
              </h3>
              <p className='text-gray-400 text-sm max-w-xs leading-relaxed mb-6'>
                Agrega cursos a tu carrito para proceder con el pago.
              </p>
              <button
                onClick={() => navigate(routes.explore.cursos)}
                className='inline-flex items-center gap-2 text-[#c2a381] font-bold hover:underline bg-white px-8 py-3.5 rounded-full shadow-sm border border-gray-200'
              >
                Explorar cursos
                <IconArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* ── Layout de dos columnas ── */
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* ── Columna izquierda: Usuario + Items ── */}
              <div className='flex-1 space-y-6'>
                {/* Datos del usuario */}
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                  <p className='text-xs font-black text-gray-700 uppercase tracking-widest mb-4'>
                    Datos del comprador
                  </p>
                  {isAuthenticated ? (
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-bold text-lg shrink-0'>
                        {`${user?.nombre?.charAt(0) || ''}${user?.apellido?.charAt(0) || ''}`
                          .toUpperCase()
                          .substring(0, 2) || 'U'}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-bold text-gray-900 truncate'>
                          {user?.nombre} {user?.apellido}
                        </p>
                        <p className='text-xs text-gray-400 truncate'>{user?.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      <p className='text-sm text-gray-500'>
                        Inicia sesión para continuar con tu compra
                      </p>
                      <SocialLoginButtons
                        onSuccess={() => toast.success('Inicio de sesión exitoso')}
                        onError={(msg) => toast.error(msg)}
                      />
                    </div>
                  )}
                </div>

                {/* Resumen del pedido */}
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                  <div className='flex items-center justify-between mb-5'>
                    <p className='text-xs font-black text-gray-700 uppercase tracking-widest'>
                      Resumen del pedido
                    </p>
                    <span className='bg-[#faf7f5] text-[#c2a381] text-xs font-bold px-3 py-1 rounded-full'>
                      {itemCount} {itemCount === 1 ? 'curso' : 'cursos'}
                    </span>
                  </div>

                  <div className='space-y-3'>
                    {items.map((item) => (
                      <div
                        key={item.cursoId}
                        className='flex gap-4 p-4 bg-[#faf7f5] rounded-2xl relative group'
                      >
                        {/* Thumbnail */}
                        <div className='w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100'>
                          {item.imagenPortada ? (
                            <img
                              src={item.imagenPortada}
                              alt={item.titulo}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='w-full h-full flex items-center justify-center bg-[#f3ece5]'>
                              <IconShoppingBag
                                size={24}
                                className='text-[#c2a381]'
                                stroke={1.5}
                              />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-bold text-gray-900 leading-snug truncate pr-8'>
                            {item.titulo}
                          </p>
                          {item.categoria && (
                            <p className='text-[10px] text-[#c2a381] font-semibold mt-0.5 uppercase tracking-wide'>
                              {item.categoria}
                            </p>
                          )}
                          <p className='text-lg font-black text-gray-900 mt-1.5'>
                            ${item.precio.toFixed(2)}
                          </p>
                        </div>

                        {/* Botón eliminar */}
                        <button
                          onClick={() => removeFromCart(item.cursoId)}
                          className='absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 transition-colors'
                          title='Eliminar'
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Vaciar carrito */}
                  <button
                    onClick={clearCart}
                    className='w-full text-xs text-gray-400 hover:text-red-400 font-medium transition-colors py-3 mt-2'
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>

              {/* ── Columna derecha: Pago ── */}
              <div className='w-full lg:w-96 shrink-0'>
                <div className='sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-5'>
                  <p className='text-xs font-black text-gray-700 uppercase tracking-widest'>
                    Detalles del pago
                  </p>

                  {/* Desglose */}
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-500'>
                        Subtotal ({itemCount} {itemCount === 1 ? 'curso' : 'cursos'})
                      </span>
                      <span className='font-bold text-gray-900'>${total.toFixed(2)}</span>
                    </div>
                    <div className='border-t border-gray-100'></div>
                    <div className='flex items-center justify-between'>
                      <span className='text-base font-bold text-gray-900'>Total</span>
                      <span className='text-2xl font-black text-gray-900'>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* PayPal */}
                  <PayPalScriptProvider
                    options={{
                      'client-id':
                        'BAAqXghrD-TsFEZnsKbp1SKvdJknhrMIBL88_S3ZDf2_CAt1znUKoH1zCQtInTBHF-cyWHtO42eQlPvalE',
                      currency: 'USD',
                      intent: 'capture',
                      'disable-funding': 'card,credit,paylater',
                    }}
                  >
                    {/* Contenedor estático transparente para no alterar el botón nativo */}
                    <div className='relative z-0 mt-2 w-full h-[45px] rounded-full flex flex-col justify-center overflow-hidden'>
                      <PayPalButtons
                        fundingSource='paypal'
                        style={{
                          layout: 'vertical',
                          shape: 'pill',
                          color: 'gold',
                          height: 45,
                          label: 'pay',
                        }}
                        disabled={!isAuthenticated}
                        createOrder={async () => {
                          try {
                            const cursos = items.map((item) => ({
                              cursoId: item.cursoId,
                            }))
                            const res = await createPayPalOrder(cursos)
                            console.log('Respuesta de createOrder backend:', res.data)

                            const orderId =
                              res.data.orderId ||
                              res.data.orderID ||
                              res.data.id ||
                              res.data.order_id

                            if (!orderId) {
                              throw new Error(
                                'El backend no retornó un ID de orden válido.'
                              )
                            }
                            return orderId
                          } catch (error) {
                            if (error.response) {
                              toast.error(
                                error.response.data?.message ||
                                  'Error al procesar la solicitud.'
                              )
                            } else {
                              toast.error('Hubo un error iniciando el pago.')
                              console.error('PayPal createOrder Error:', error)
                            }

                            return null // Retornar null detiene a PayPal
                          }
                        }}
                        onApprove={async (data) => {
                          try {
                            await capturePayPalOrder(data.orderID)
                            handlePaymentSuccess()
                          } catch (error) {
                            toast.error('Error al procesar el pago')
                            console.error(error)
                          }
                        }}
                        onError={(err) => {
                          if (!String(err).includes('Expected an order id')) {
                            toast.error('Hubo un problema con la plataforma de pago')
                            console.error('PayPal onError:', err)
                          }
                        }}
                      />
                    </div>
                  </PayPalScriptProvider>

                  {/* Seguridad */}
                  <div className='pt-4 border-t border-gray-100 space-y-2.5'>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <IconShieldCheck
                        size={15}
                        className='text-[#c2a381] shrink-0'
                        stroke={1.5}
                      />
                      <span>Pago seguro con PayPal</span>
                    </div>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <IconLock
                        size={15}
                        className='text-[#c2a381] shrink-0'
                        stroke={1.5}
                      />
                      <span>Tus datos están protegidos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CheckoutPage

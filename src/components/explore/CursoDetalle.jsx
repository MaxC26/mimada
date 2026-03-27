import { useState } from 'react'
import {
  IconPlayerPlay,
  IconStar,
  IconClock,
  IconBook2,
  IconCertificate,
  IconChevronDown,
  IconArrowLeft,
  IconShoppingCart,
  IconCheck,
} from '@tabler/icons-react'
import RatingStars from '../utils/RatingStars'

/* ── Sub: Accordion item ── */
const AccordionItem = ({ index, titulo }) => {
  return (
    <div className='border border-gray-100 rounded-xl overflow-hidden bg-white hover:bg-[#faf7f5] transition-all px-5 py-4 flex items-center justify-between gap-4'>
      <div className='flex items-center gap-3'>
        <span className='w-7 h-7 rounded-lg bg-[#c2a381] text-white text-xs font-black flex items-center justify-center shrink-0'>
          {String(index).padStart(2, '0')}
        </span>
        <span className='font-semibold text-gray-800 text-sm'>{titulo}</span>
      </div>
    </div>
  )
}

/* ── Componente principal ── */
const CursoDetalle = ({ data, onBack }) => {
  const [tab, setTab] = useState('descripcion')
  const [showAllReviews, setShowAllReviews] = useState(false)

  console.log(data)

  // Transformar datos del API (o fallback) a la estructura plana usada por React
  const curso = data?.curso ?? {}
  const reseñasData = data?.reseñas || []
  const ratingData = data?.rating || { promedio: 0, total: 0, distribucion: [] }
  const leccionesData = data?.lecciones || []

  const detalle = {
    breadcrumb: ['Inicio', 'Cursos', curso.categoria || 'General'],
    titulo: curso.titulo || '',
    descripcion: curso.descripcion || '',
    precio: parseFloat(curso.precio) || 0,
    thumbnail: curso.imagenPortada || '',
    lecciones: leccionesData,
    reviews: reseñasData.map((r, idx) => ({
      nombre: `${r.nombre || ''} ${r.apellido || ''}`.trim(),
      avatar: `https://i.pravatar.cc/150?img=${(idx % 50) + 1}`,
      texto: r.comentario,
      estrellas: parseInt(r.calificacion) || 5,
    })),
    ratingDist: [5, 4, 3, 2, 1].map((stars) => {
      const match = ratingData.distribucion?.find(
        (d) => parseInt(d.calificacion) === stars,
      )
      const count = match ? parseInt(match.total) : 0
      const pct = ratingData.total > 0 ? Math.round((count / ratingData.total) * 100) : 0
      return { estrellas: stars, pct }
    }),
    rating: parseFloat(ratingData.promedio) || 0,
    totalReviews: ratingData.total || 0,
    garantia: '7 días de garantía incondicional',
    incluye: [
      { icon: IconClock, texto: `${curso.duracionTotal} horas de contenido en video` },
      { icon: IconBook2, texto: 'Apuntes PDF completos' },
      { icon: IconCertificate, texto: 'Certificado de conclusión' },
      { icon: IconStar, texto: 'Acceso vitalicio' },
    ],
    instructor: {
      nombre: 'Dra. Helena Silva',
      titulo: 'Especialista en Estética Avanzada',
      tags: ['15 AÑOS DE EXP.', 'PROFA NACIONAL'],
      avatar: 'https://i.pravatar.cc/150?img=47',
      bio: 'Referencia nacional de lujo, la Dra. Helena Silva formó más de 5.000 alumnas en todo el Brasil. Su metodología fusiona la excelencia del arte con el humanismo de los atenciones estéticos.',
    },
    // NOTE - ESTO ES SOLO PARA PROBAR
    // reviews: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
    //   nombre: `Estudiante ${i}`,
    //   avatar: `https://i.pravatar.cc/150?img=${(i % 50) + 1}`,
    //   texto: `Este curso es excelente, lo recomiendo mucho. ${i}`,
    //   estrellas: (i % 5) + 1,
    // })),
    // NOTE - ESTO ES SOLO PARA PROBAR
    // ratingDist: [
    //   { estrellas: 5, pct: 85 },
    //   { estrellas: 4, pct: 10 },
    //   { estrellas: 3, pct: 3 },
    //   { estrellas: 2, pct: 1 },
    //   { estrellas: 1, pct: 1 },
    // ],
  }

  return (
    <div className='w-full max-w-6xl mx-auto'>
      {/* Breadcrumb + back */}
      <button
        onClick={onBack}
        className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#c2a381] transition-colors mb-6 group'
      >
        <IconArrowLeft
          size={16}
          className='group-hover:-translate-x-0.5 transition-transform'
        />
        Volver a Cursos
      </button>

      {/* Breadcrumb */}
      <p className='text-xs text-gray-400 mb-3'>
        {detalle?.breadcrumb?.map((b, i) => (
          <span key={b}>
            {i > 0 && <span className='mx-1'>›</span>}
            <span
              className={
                i === detalle.breadcrumb.length - 1 ? 'text-[#c2a381] font-semibold' : ''
              }
            >
              {b}
            </span>
          </span>
        ))}
      </p>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* ── Columna principal ── */}
        <div className='flex-1 min-w-0'>
          {/* Título */}
          <h1 className='text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2'>
            {detalle?.titulo}
          </h1>
          <p className='text-gray-500 mb-5 text-sm leading-relaxed'>
            {detalle?.subtitulo}
          </p>

          {/* Video player */}
          <div className='relative w-full rounded-2xl overflow-hidden bg-black mb-6 aspect-video'>
            <img
              src={detalle?.thumbnail}
              alt={detalle?.titulo}
              className='w-full h-full object-cover opacity-80'
            />
            {/* Play button */}
            <button
              className='absolute inset-0 flex items-center justify-center group'
              // onClick={() => setPlaying(true)}
            >
              <div className='w-16 h-16 rounded-full bg-[#c2a381] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300'>
                <IconPlayerPlay size={28} fill='white' className='text-white ml-1' />
              </div>
            </button>
            {/* Progress bar */}
            <div className='absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 flex items-center gap-3'>
              <span className='text-white text-xs font-mono'>00:45</span>
              <div className='flex-1 h-1 bg-white/30 rounded-full'>
                <div className='h-full w-[6%] bg-[#c2a381] rounded-full' />
              </div>
              <span className='text-white text-xs font-mono'>{detalle?.duracion}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex gap-1 border-b border-gray-100 mb-6'>
            {[
              { id: 'descripcion', label: 'Descripción' },
              { id: 'instructor', label: 'Instructor' },
              leccionesData.length > 0 && { id: 'lecciones', label: 'Lecciones' },
            ]
              .filter(Boolean)
              .map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all ${tab === t.id ? 'border-[#c2a381] text-[#c2a381]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {t.label}
                </button>
              ))}
          </div>

          {/* Tab: Descripción */}
          {tab === 'descripcion' && (
            <div className='space-y-6'>
              <div>
                <h3 className='font-black text-gray-900 text-xl mb-3'>
                  Sobre este curso
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {detalle?.descripcion}
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {detalle?.beneficios?.map((b) => (
                  <div key={b} className='flex items-center gap-2 text-sm text-gray-700'>
                    <IconCheck
                      size={16}
                      className='text-[#c2a381] shrink-0'
                      stroke={2.5}
                    />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Instructor */}
          {tab === 'instructor' && (
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
              <div className='flex items-start gap-4'>
                <img
                  src={detalle?.instructor?.avatar}
                  alt={detalle?.instructor?.nombre}
                  className='w-16 h-16 rounded-full object-cover border-2 border-[#f3ece5] shrink-0'
                />
                <div>
                  <h4 className='font-black text-gray-900 text-lg'>
                    {detalle?.instructor?.nombre}
                  </h4>
                  <p className='text-[#c2a381] text-sm font-semibold mb-2'>
                    {detalle?.instructor?.titulo}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {detalle?.instructor?.tags?.map((t) => (
                      <span
                        key={t}
                        className='text-xs font-bold bg-[#faf7f5] text-[#c2a381] px-3 py-1 rounded-full'
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {detalle?.instructor?.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Lecciones */}
          {tab === 'lecciones' && (
            <div className='space-y-3'>
              <h3 className='font-black text-gray-900 text-xl mb-4'>
                Contenido del curso
              </h3>
              {detalle?.lecciones?.map((mod, i) => (
                <AccordionItem key={mod.titulo} index={i + 1} titulo={mod.titulo} />
              ))}
            </div>
          )}

          {/* Reviews */}
          {detalle?.reviews?.length > 0 && (
            <div className='mt-10'>
              <h3 className='font-black text-gray-900 text-xl mb-6'>
                Lo que dicen nuestros estudiantes
              </h3>
              <div className='flex flex-col sm:flex-row gap-6 mb-6'>
                {/* Rating global */}
                <div className='flex flex-col items-center justify-center bg-[#faf7f5] rounded-2xl px-8 py-6 shrink-0'>
                  <p className='text-6xl font-black text-[#c2a381]'>{detalle?.rating}</p>
                  <RatingStars rating={detalle?.rating} size={20} />
                  <p className='text-xs text-gray-500 mt-1'>
                    Promedio de {detalle?.totalReviews?.toLocaleString()} reseñas
                  </p>
                </div>
                {/* Barras */}
                <div className='flex-1 space-y-2 justify-center flex flex-col'>
                  {detalle?.ratingDist?.map((r) => (
                    <div key={r.estrellas} className='flex items-center gap-3'>
                      <span className='text-xs text-gray-500 w-8 shrink-0'>
                        {r.estrellas} ★
                      </span>
                      <div className='flex-1 h-2 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-[#c2a381] rounded-full'
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className='text-xs text-gray-400 w-8 text-right'>
                        {r.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tarjetas de review (Máximo 3) */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {detalle?.reviews?.slice(0, 3).map((rev, idx) => (
                  <div
                    key={`card-${rev.nombre}-${idx}`}
                    className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'
                  >
                    {console.log(rev)}
                    <div className='flex items-center gap-3 mb-3'>
                      <img
                        src={rev.avatar}
                        alt={rev.nombre}
                        className='w-9 h-9 rounded-full object-cover'
                      />
                      <div>
                        <p className='text-sm font-bold text-gray-900'>{rev.nombre}</p>
                        <RatingStars rating={rev.estrellas} size={11} />
                      </div>
                    </div>
                    <p className='text-xs text-gray-600 leading-relaxed'>{rev.texto}</p>
                  </div>
                ))}
              </div>

              {/* Lista adicional de comentarios */}
              {showAllReviews && detalle?.reviews?.length > 3 && (
                <div className='mt-6 flex flex-col gap-4'>
                  {detalle.reviews.slice(3).map((rev, idx) => (
                    <div
                      key={`list-${rev.nombre}-${idx}`}
                      className='flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow'
                    >
                      <img
                        src={rev.avatar}
                        alt={rev.nombre}
                        className='w-12 h-12 rounded-full object-cover shrink-0'
                      />
                      <div className='flex-1'>
                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1'>
                          <p className='text-sm font-black text-gray-900'>{rev.nombre}</p>
                          <RatingStars rating={rev.estrellas} size={13} />
                        </div>
                        <p className='text-sm text-gray-600 leading-relaxed'>
                          {rev.texto}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {detalle?.reviews?.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className='mt-6 text-sm font-bold text-[#c2a381] hover:underline flex items-center justify-center gap-1 w-full sm:w-auto mx-auto'
                >
                  {showAllReviews
                    ? 'Mostrar menos'
                    : `Ver todos los ${detalle?.totalReviews?.toLocaleString() || detalle?.reviews?.length} comentarios`}
                  <IconChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${showAllReviews ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── Columna lateral: Precio ── */}
        <div className='w-full lg:w-80 shrink-0'>
          <div className='sticky top-25 bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-4'>
            {/* Precio */}
            <div>
              <p className='text-3xl font-black text-gray-900'>
                ${detalle?.precio?.toFixed(2)}
              </p>
              {/* <div className='flex items-center gap-2 mt-0.5'>
                <p className='text-sm text-gray-400 line-through'>
                  ${detalle?.precioOriginal?.toFixed(2)}
                </p>
                <span className='text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>
                  {detalle?.descuento}% OFF
                </span>
              </div> */}
            </div>

            {/* Botones */}
            <button className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-black shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm'>
              Comprar curso ahora
            </button>
            <button className='w-full py-3 rounded-full border-2 border-[#c2a381] text-[#c2a381] font-bold text-sm hover:bg-[#faf7f5] transition-colors flex items-center justify-center gap-2'>
              <IconShoppingCart size={16} />
              Añadir al carrito
            </button>

            {/* Lo que incluye */}
            <div className='pt-2 border-t border-gray-100'>
              <p className='text-xs font-black text-gray-700 uppercase tracking-widest mb-3'>
                ¿Qué está incluido?
              </p>
              <ul className='space-y-2'>
                {detalle?.incluye?.map(({ icon: Icon, texto }) => (
                  <li
                    key={texto}
                    className='flex items-center gap-2 text-xs text-gray-600'
                  >
                    <Icon size={15} className='text-[#c2a381] shrink-0' stroke={1.5} />
                    {texto}
                  </li>
                ))}
              </ul>
            </div>

            {/* Garantía */}
            <div className='flex items-center gap-2 border-t border-gray-100 pt-3'>
              <IconCheck size={15} className='text-green-500 shrink-0' stroke={2.5} />
              <p className='text-xs text-gray-600 font-medium'>{detalle?.garantia}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CursoDetalle

import { useState } from 'react'
import {
  IconPlayerPlay,
  IconStar,
  IconClock,
  IconBook2,
  IconCertificate,
  IconChevronDown,
  IconChevronRight,
  IconArrowLeft,
  IconShoppingCart,
  IconCheck,
} from '@tabler/icons-react'

/* ── Datos de ejemplo del curso ── */
const CURSO_MOCK = {
  breadcrumb: ['Inicio', 'Cursos', 'Mimadas Premium'],
  titulo: 'Mimadas Premium: Masterclass de Estética y Visagismo',
  subtitulo: 'Perfecciona tus técnicas con la metodología exclusiva Mimadas y destácate en el mercado de lujo.',
  precio: 89.0,
  precioOriginal: 120.0,
  descuento: 26,
  thumbnail: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200&auto=format&fit=crop',
  duracion: '11:28',
  rating: 4.9,
  totalReviews: 1250,
  incluye: [
    { icon: IconClock,       texto: '40 horas de contenido en video' },
    { icon: IconBook2,       texto: 'Apuntes PDF completos' },
    { icon: IconCertificate, texto: 'Certificado de conclusión' },
    { icon: IconStar,        texto: 'Acceso vitalicio' },
  ],
  garantia: '7 días de garantía incondicional',
  descripcion: `Este curso fue desarrollado para profesionales que buscan elevar la calidad de sus atenciones al máximo. A través de módulos prácticos y teóricos, aprenderás técnicas avanzadas de harmonización facial, utilizando los protocolos exclusivos que formarán Mimadas una referencia nacional.`,
  beneficios: [
    'Técnicas al nivel de alto patrón', 'Protocolos de botulínica premium',
    'Marketing y gestión para clínicas', 'Certificación reconocida Mimadas',
  ],
  instructor: {
    nombre: 'Dra. Helena Silva',
    titulo: 'Especialista en Estética Avanzada',
    tags: ['15 AÑOS DE EXP.', 'PROFA NACIONAL'],
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Referencia nacional de lujo, la Dra. Helena Silva formó más de 5.000 alumnas en todo el Brasil. Su metodología fusiona la excelencia del arte con el humanismo de los atenciones estéticos.',
  },
  curriculo: [
    { titulo: 'Introducción al Método Mimadas', lecciones: 3 },
    { titulo: 'Anatomía y Visagismo Aplicado', lecciones: 5 },
    { titulo: 'Técnicas de Harmonización Labial', lecciones: 4 },
    { titulo: 'Protocolos Avanzados de Botulínica', lecciones: 6 },
    { titulo: 'Marketing para Clínicas de Lujo', lecciones: 3 },
  ],
  reviews: [
    { nombre: 'Ana María Castro', avatar: 'https://i.pravatar.cc/150?img=1', texto: 'El curso superó todas mis expectativas. La metodología es muy completa y los protocolos de lujo me han marcado la diferencia.' },
    { nombre: 'Roberta Pérez', avatar: 'https://i.pravatar.cc/150?img=5', texto: 'Lo que más me gustó fueron los detalles que nadie te enseña. Las técnicas avanzadas que no vi en ningún otro lugar.' },
    { nombre: 'Luciana Gomes', avatar: 'https://i.pravatar.cc/150?img=9', texto: 'Mejor reconocimiento que he tenido. El soporte es increíble y la plataforma es muy fácil de usar. ¡Estoy muy contenta!' },
  ],
  ratingDist: [
    { estrellas: 5, pct: 78 },
    { estrellas: 4, pct: 12 },
    { estrellas: 3, pct: 7 },
    { estrellas: 2, pct: 2 },
    { estrellas: 1, pct: 1 },
  ],
}

/* ── Sub: Stars ── */
const Stars = ({ rating, size = 16 }) => (
  <div className='flex gap-0.5'>
    {[1,2,3,4,5].map(i => (
      <IconStar
        key={i}
        size={size}
        className={i <= Math.round(rating) ? 'fill-[#e43c8a] text-[#e43c8a]' : 'text-gray-300'}
        stroke={0}
      />
    ))}
  </div>
)

/* ── Sub: Accordion item ── */
const AccordionItem = ({ index, titulo, lecciones }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border border-gray-100 rounded-xl overflow-hidden transition-all ${open ? 'bg-[#fdf2f8]' : 'bg-white hover:bg-gray-50'}`}>
      <button
        className='w-full flex items-center justify-between px-5 py-4 text-left'
        onClick={() => setOpen(!open)}
      >
        <div className='flex items-center gap-3'>
          <span className='w-7 h-7 rounded-lg bg-[#e43c8a] text-white text-xs font-black flex items-center justify-center shrink-0'>
            {String(index).padStart(2, '0')}
          </span>
          <span className='font-semibold text-gray-800 text-sm'>{titulo}</span>
        </div>
        {open
          ? <IconChevronDown size={18} className='text-[#e43c8a] shrink-0' />
          : <IconChevronRight size={18} className='text-gray-400 shrink-0' />
        }
      </button>
      {open && (
        <div className='px-5 pb-4'>
          <p className='text-xs text-gray-500 ml-10'>{lecciones} lecciones incluidas en este módulo</p>
        </div>
      )}
    </div>
  )
}

/* ── Componente principal ── */
const CursoDetalle = ({ onBack }) => {
  const [tab, setTab] = useState('descripcion')
  const [playing, setPlaying] = useState(false)
  const c = CURSO_MOCK

  return (
    <div className='w-full max-w-6xl mx-auto'>

      {/* Breadcrumb + back */}
      <button
        onClick={onBack}
        className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#e43c8a] transition-colors mb-6 group'
      >
        <IconArrowLeft size={16} className='group-hover:-translate-x-0.5 transition-transform' />
        Volver a Cursos
      </button>

      {/* Breadcrumb */}
      <p className='text-xs text-gray-400 mb-3'>
        {c.breadcrumb.map((b, i) => (
          <span key={b}>
            {i > 0 && <span className='mx-1'>›</span>}
            <span className={i === c.breadcrumb.length - 1 ? 'text-[#e43c8a] font-semibold' : ''}>{b}</span>
          </span>
        ))}
      </p>

      <div className='flex flex-col lg:flex-row gap-8'>

        {/* ── Columna principal ── */}
        <div className='flex-1 min-w-0'>

          {/* Título */}
          <h1 className='text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2'>{c.titulo}</h1>
          <p className='text-gray-500 mb-5 text-sm leading-relaxed'>{c.subtitulo}</p>

          {/* Video player */}
          <div className='relative w-full rounded-2xl overflow-hidden bg-black mb-6 aspect-video'>
            <img src={c.thumbnail} alt={c.titulo} className='w-full h-full object-cover opacity-80' />
            {/* Play button */}
            <button
              className='absolute inset-0 flex items-center justify-center group'
              onClick={() => setPlaying(true)}
            >
              <div className='w-16 h-16 rounded-full bg-[#e43c8a] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300'>
                <IconPlayerPlay size={28} fill='white' className='text-white ml-1' />
              </div>
            </button>
            {/* Progress bar */}
            <div className='absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 flex items-center gap-3'>
              <span className='text-white text-xs font-mono'>00:45</span>
              <div className='flex-1 h-1 bg-white/30 rounded-full'>
                <div className='h-full w-[6%] bg-[#e43c8a] rounded-full' />
              </div>
              <span className='text-white text-xs font-mono'>{c.duracion}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex gap-1 border-b border-gray-100 mb-6'>
            {[
              { id: 'descripcion', label: 'Descripción' },
              { id: 'instructor',  label: 'Instructor' },
              { id: 'curriculo',   label: 'Currículo' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all ${tab === t.id ? 'border-[#e43c8a] text-[#e43c8a]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Descripción */}
          {tab === 'descripcion' && (
            <div className='space-y-6'>
              <div>
                <h3 className='font-black text-gray-900 text-xl mb-3'>Sobre este curso</h3>
                <p className='text-gray-600 text-sm leading-relaxed'>{c.descripcion}</p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {c.beneficios.map(b => (
                  <div key={b} className='flex items-center gap-2 text-sm text-gray-700'>
                    <IconCheck size={16} className='text-[#e43c8a] shrink-0' stroke={2.5} />
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
                <img src={c.instructor.avatar} alt={c.instructor.nombre} className='w-16 h-16 rounded-full object-cover border-2 border-[#fce7f3] shrink-0' />
                <div>
                  <h4 className='font-black text-gray-900 text-lg'>{c.instructor.nombre}</h4>
                  <p className='text-[#e43c8a] text-sm font-semibold mb-2'>{c.instructor.titulo}</p>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {c.instructor.tags.map(t => (
                      <span key={t} className='text-xs font-bold bg-[#fdf2f8] text-[#e43c8a] px-3 py-1 rounded-full'>{t}</span>
                    ))}
                  </div>
                  <p className='text-gray-600 text-sm leading-relaxed'>{c.instructor.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Currículo */}
          {tab === 'curriculo' && (
            <div className='space-y-3'>
              <h3 className='font-black text-gray-900 text-xl mb-4'>Contenido Programático</h3>
              {c.curriculo.map((mod, i) => (
                <AccordionItem key={mod.titulo} index={i + 1} titulo={mod.titulo} lecciones={mod.lecciones} />
              ))}
            </div>
          )}

          {/* Reviews */}
          <div className='mt-10'>
            <h3 className='font-black text-gray-900 text-xl mb-6'>Lo que dicen nuestros estudiantes</h3>
            <div className='flex flex-col sm:flex-row gap-6 mb-6'>
              {/* Rating global */}
              <div className='flex flex-col items-center justify-center bg-[#fdf2f8] rounded-2xl px-8 py-6 shrink-0'>
                <p className='text-6xl font-black text-[#e43c8a]'>{c.rating}</p>
                <Stars rating={c.rating} size={20} />
                <p className='text-xs text-gray-500 mt-1'>Promedio de {c.totalReviews.toLocaleString()} reseñas</p>
              </div>
              {/* Barras */}
              <div className='flex-1 space-y-2 justify-center flex flex-col'>
                {c.ratingDist.map(r => (
                  <div key={r.estrellas} className='flex items-center gap-3'>
                    <span className='text-xs text-gray-500 w-8 shrink-0'>{r.estrellas} ★</span>
                    <div className='flex-1 h-2 bg-gray-100 rounded-full overflow-hidden'>
                      <div className='h-full bg-[#e43c8a] rounded-full' style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className='text-xs text-gray-400 w-8 text-right'>{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Tarjetas de review */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {c.reviews.map(rev => (
                <div key={rev.nombre} className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
                  <div className='flex items-center gap-3 mb-3'>
                    <img src={rev.avatar} alt={rev.nombre} className='w-9 h-9 rounded-full object-cover' />
                    <div>
                      <p className='text-sm font-bold text-gray-900'>{rev.nombre}</p>
                      <Stars rating={5} size={11} />
                    </div>
                  </div>
                  <p className='text-xs text-gray-600 leading-relaxed'>{rev.texto}</p>
                </div>
              ))}
            </div>
            <button className='mt-4 text-sm font-bold text-[#e43c8a] hover:underline flex items-center gap-1'>
              Ver los {c.totalReviews.toLocaleString()} comentarios <IconChevronDown size={16} />
            </button>
          </div>

        </div>

        {/* ── Columna lateral: Precio ── */}
        <div className='w-full lg:w-80 shrink-0'>
          <div className='sticky top-4 bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-4'>
            {/* Precio */}
            <div>
              <p className='text-3xl font-black text-gray-900'>${c.precio.toFixed(2)}</p>
              <div className='flex items-center gap-2 mt-0.5'>
                <p className='text-sm text-gray-400 line-through'>${c.precioOriginal.toFixed(2)}</p>
                <span className='text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>{c.descuento}% OFF</span>
              </div>
            </div>

            {/* Botones */}
            <button className='w-full py-3.5 rounded-full bg-[#e43c8a] text-white font-black shadow-md shadow-[#e43c8a]/30 hover:bg-[#c9246d] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm'>
              Comprar curso ahora
            </button>
            <button className='w-full py-3 rounded-full border-2 border-[#e43c8a] text-[#e43c8a] font-bold text-sm hover:bg-[#fdf2f8] transition-colors flex items-center justify-center gap-2'>
              <IconShoppingCart size={16} />
              Añadir al carrito
            </button>

            {/* Lo que incluye */}
            <div className='pt-2 border-t border-gray-100'>
              <p className='text-xs font-black text-gray-700 uppercase tracking-widest mb-3'>¿Qué está incluido?</p>
              <ul className='space-y-2'>
                {c.incluye.map(({ icon: Icon, texto }) => (
                  <li key={texto} className='flex items-center gap-2 text-xs text-gray-600'>
                    <Icon size={15} className='text-[#e43c8a] shrink-0' stroke={1.5} />
                    {texto}
                  </li>
                ))}
              </ul>
            </div>

            {/* Garantía */}
            <div className='flex items-center gap-2 border-t border-gray-100 pt-3'>
              <IconCheck size={15} className='text-green-500 shrink-0' stroke={2.5} />
              <p className='text-xs text-gray-600 font-medium'>{c.garantia}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CursoDetalle

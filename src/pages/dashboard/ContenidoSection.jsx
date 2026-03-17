import { useEffect, useState } from 'react'
import { getContenidoBySeccion } from '../../services/contenido'
import LoadingSpinner from '../../components/utils/LoadingSpinner'

/**
 * Componente reutilizable para secciones del dashboard con fetch de contenido.
 *
 * Uso (render prop):
 *   <ContenidoSection seccion='Head'>
 *     {(contenido, setIsLoading) => <Inicio contenido={contenido} setIsLoading={setIsLoading} />}
 *   </ContenidoSection>
 *
 * @param {string}    seccion  - Identificador de sección para la API
 * @param {Function}  children - Función que recibe (contenido, setIsLoading) y retorna JSX
 */
const ContenidoSection = ({ seccion, children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [contenido, setContenido] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getContenidoBySeccion(seccion)
      .then((res) => setContenido(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }, [seccion])

  if (isLoading)
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <LoadingSpinner />
      </div>
    )

  return children(contenido, setIsLoading)
}

export default ContenidoSection


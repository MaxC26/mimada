import axios from 'axios'
import { routes } from '../utils/rutas'

// Obtiene las categorías de cursos
export function getCategoriasCurso() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${routes.backend.url}${routes.backend.categorias.getCategorias}`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Obtiene los estados de cursos
export function getEstadosCurso() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${routes.backend.url}${routes.backend.cursos.getEstados}`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Actualiza un curso existente
export function getCursos() {
  const url = `${routes.backend.url}${routes.backend.cursos.getCursos}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export function getCursosPopulares() {
  const url = `${routes.backend.url}${routes.backend.cursos.getCursosPopulares}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Crea un nuevo curso (acepta FormData para incluir archivos)
export function createCurso(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${routes.backend.url}${routes.backend.cursos.createCurso}`, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Actualiza un curso existente
export function updateCurso(data) {
  const url = `${routes.backend.url}${routes.backend.cursos.updateCurso}`
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Elimina un curso
export function deleteCurso(cursoId) {
  const url = `${routes.backend.url}${routes.backend.cursos.deleteCurso}`.replace(
    ':id',
    cursoId,
  )
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Obtiene los videos de un curso
export function getVideosCurso(cursoId) {
  const url = `${routes.backend.url}${routes.backend.cursos.getVideosCurso}`.replace(
    ':id',
    cursoId,
  )
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Crea un nuevo video (lección) para un curso
export function createVideoCurso(data) {
  const url = `${routes.backend.url}${routes.backend.cursos.createVideo}`
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Actualiza un video existente
export function updateVideoCurso(data) {
  const url = `${routes.backend.url}${routes.backend.cursos.updateVideo}`
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Elimina un video
export function deleteVideoCurso(videoId) {
  const url = `${routes.backend.url}${routes.backend.cursos.deleteVideo}`.replace(
    ':id',
    videoId,
  )
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

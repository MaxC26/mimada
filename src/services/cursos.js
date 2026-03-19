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

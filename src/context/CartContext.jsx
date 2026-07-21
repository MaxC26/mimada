import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { useAuth } from './AuthContext'
import {
  getCarrito,
  addItemCarrito,
  removeItemCarrito,
  clearCarritoRemoto,
} from '../services/carrito'

// ── Constantes ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'mimada_cart'

// ── Helpers localStorage ──────────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* silencioso */
  }
}

// ── Reducer ───────────────────────────────────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload

    case 'ADD_ITEM': {
      const exists = state.some((i) => i.cursoId === action.payload.cursoId)
      if (exists) return state
      return [...state, action.payload]
    }

    case 'REMOVE_ITEM':
      return state.filter((i) => i.cursoId !== action.payload)

    case 'CLEAR':
      return []

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [items, dispatch] = useReducer(cartReducer, [], loadFromStorage)
  const [isOpen, setIsOpen] = useState(false)

  // Persiste en localStorage cada vez que cambia el carrito
  useEffect(() => {
    saveToStorage(items)
  }, [items])

  // Cuando el usuario inicia sesión, intenta sincronizar con el backend
  useEffect(() => {
    if (!isAuthenticated) return

    getCarrito()
      .then((res) => {
        const serverItems = res.data?.items ?? []
        if (serverItems.length > 0) {
          // Fusiona: prevalecen los items del servidor
          dispatch({ type: 'SET_ITEMS', payload: serverItems })
        }
      })
      .catch(() => {
        // Backend no disponible aún — se usa localStorage sin problema
      })
  }, [isAuthenticated])

  // ── Acciones ────────────────────────────────────────────────────────────────

  /** Agrega un curso al carrito (y al backend si está autenticado) */
  const addToCart = useCallback(
    (curso) => {
      const item = {
        cursoId: curso.cursoId ?? curso.id,
        titulo: curso.titulo,
        precio: parseFloat(curso.precio) || 0,
        imagenPortada: curso.imagenPortada ?? curso.thumbnail ?? '',
        categoria: curso.categoria ?? '',
      }
      dispatch({ type: 'ADD_ITEM', payload: item })
      if (isAuthenticated) {
        addItemCarrito(item.cursoId).catch(() => {/* ya está en local */})
      }
    },
    [isAuthenticated],
  )

  /** Elimina un curso del carrito */
  const removeFromCart = useCallback(
    (cursoId) => {
      dispatch({ type: 'REMOVE_ITEM', payload: cursoId })
      if (isAuthenticated) {
        removeItemCarrito(cursoId).catch(() => {})
      }
    },
    [isAuthenticated],
  )

  /** Vacía el carrito completo */
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
    if (isAuthenticated) {
      clearCarritoRemoto().catch(() => {})
    }
  }, [isAuthenticated])

  /** Verifica si un curso ya está en el carrito */
  const isInCart = useCallback(
    (cursoId) => items.some((i) => i.cursoId === cursoId),
    [items],
  )

  const total = items.reduce((acc, i) => acc + i.precio, 0)
  const itemCount = items.length

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

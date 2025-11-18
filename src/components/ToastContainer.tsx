import { useState, useCallback, useEffect } from 'react'
import Toast from './Toast'

interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

let toastId = 0
const toastListeners: Array<(toast: ToastMessage) => void> = []

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  const id = `toast-${toastId++}`
  const toast: ToastMessage = { id, message, type }
  toastListeners.forEach((listener) => listener(toast))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    toastListeners.push(addToast)
    return () => {
      const index = toastListeners.indexOf(addToast)
      if (index > -1) {
        toastListeners.splice(index, 1)
      }
    }
  }, [addToast])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}


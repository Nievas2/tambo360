import { useState, useEffect } from 'react'

export function OfflineScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRetry = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (navigator.onLine) {
        window.location.reload()
      } else {
        setIsLoading(false)
      }
    }, 1000)
  }

  useEffect(() => {
    const handleOnline = () => window.location.reload()
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="flex w-full max-w-104 flex-col items-center gap-4 rounded-4xl bg-white px-10 py-12 text-center shadow-sm">
        <div className="mb-2 rounded-[0.875rem] bg-slate-100 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-slate-400"
          >
            <line x1="2" y1="2" x2="22" y2="22" />
            <path d="M8.5 16.5a5 5 0 0 1 7 0" />
            <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
            <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" />
            <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" />
            <path d="M5 13a10 10 0 0 1 5.24-2.76" />
            <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-slate-400">
          Sin conexión a internet
        </h1>

        <p className="max-w-[20rem] text-sm leading-relaxed text-slate-400">
          Tu dispositivo no esta conectado. Para cargar o guardar nuevos datos,
          necesitas una conexión activa
        </p>

        <button
          onClick={handleRetry}
          disabled={isLoading}
          className="mt-3 flex items-center gap-2 rounded-lg bg-slate-800 px-7 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-zinc-900 active:bg-black disabled:cursor-not-allowed"
        >
          <span>Reintentar</span>
          {isLoading ? (
            <svg
              className="h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-6.219-8.56"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

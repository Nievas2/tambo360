import { AlertCircle } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'sonner'

export const showErrorMessage = useCallback((message?: string) => {
  toast.custom(
    () => (
      <div className="z-10000 w-full max-w-100 flex items-center justify-center gap-3 bg-[#FCE8E5] border border-[#F87171] text-[#B91C1C] px-4 py-3 rounded-lg text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-top-5 duration-300 pointer-events-auto">
        <AlertCircle
          className="w-5 h-5 shrink-0 fill-[#EF4444]"
          stroke="#FCE8E5"
          strokeWidth={3}
        />
        <span className="flex-1">
          {message || 'Revisa los campos resaltados e intenta nuevamente'}
        </span>
      </div>
    ),
    {
      duration: 4000,
      position: 'top-center',
    }
  )
}, [])

import { Alert } from '@/src/types/alerts'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/src/components/common/Button'
import Robot from '@/src/components/shared/Robot'
import { Link } from 'react-router-dom'

interface AlertConfig {
  bg: string
  iconBg: string
  border: string
  buttonBorder: string
  title: string
  description: string
}

const ALERT_CONFIG: Record<string, AlertConfig> = {
  alto: {
    bg: 'bg-alert-bg',
    iconBg: 'bg-red-main',
    border: 'border-red-main',
    buttonBorder: 'border-red-main text-black hover:bg-red-100',
    title: 'TamboEngine: Desvio alto',
    description:
      'Se ha detectado una anomalía crítica que requiere acción inmediata',
  },
  medio: {
    bg: 'bg-[#FFFBF1]',
    iconBg: 'bg-orange-alert',
    border: 'border-orange-alert',
    buttonBorder: 'border-orange-alert text-black hover:bg-yellow-100',
    title: 'TamboEngine: Desvio moderado',
    description:
      'Se ha detectado una desviación moderada que requiere seguimiento',
  },
  bajo: {
    bg: 'bg-dialogs',
    iconBg: 'bg-green-main',
    border: 'border-green-main',
    buttonBorder: 'border-green-main text-black hover:bg-green-100',
    title: 'TamboEngine: Desvio bajo',
    description:
      'Se ha detectado una leve variación en los parámetros de producción',
  },
}

interface AlertCardBatchProps {
  alert: Alert
}

export function AlertCardBatch({ alert }: AlertCardBatchProps) {
  const nivel = alert.nivel?.toLowerCase() ?? 'bajo'
  const config = ALERT_CONFIG[nivel] ?? ALERT_CONFIG['bajo']

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border px-4 py-4 ${config.bg} ${config.border}`}
    >
      {/* Icon */}
      <div className={`shrink-0 rounded-xl p-5 ${config.iconBg}`}>
        <Robot size={32} className="fill-white" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900">{config.title}</p>
        <p className="text-sm text-gray-500 truncate">{config.description}</p>
      </div>

      {/* Button */}
      <Button
        variant="ghost"
        className={`h-12 shrink-0 border ${config.buttonBorder}`}
        asChild
      >
        <Link to={`/tambo-engine/#${alert.id}`}>
          Ver Análisis
          <ArrowRight className="size-4 ml-1" />
        </Link>
      </Button>
    </div>
  )
}

import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../common/card'
import { Skeleton } from '@/src/components/common/skeleton'

interface StatCardProps {
  title: string
  value: string
  trend?: { value: number; isPositive: boolean }
  description?: string
  icon?: React.ReactNode
  unit: string
  isPending?: boolean
}

export const StatCard = ({
  title,
  value,
  trend,
  description,
  icon,
  unit,
  isPending,
}: StatCardProps) => {
  return (
    <Card className="border-slate-200 shadow-sm bg-white rounded-xl">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {icon}

          {/* Título en gris suave y negrita pequeña */}
          <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider font-inter">
            {title}
          </span>

          <div className="flex flex-col gap-1">
            {/* Valor principal en gris oscuro/negro */}
            {isPending ? (
              <Skeleton className="h-8 w-[50%]" />
            ) : unit == '$ ' ? (
              <span className="text-3xl font-bold text-slate-900 tracking-tight font-inter">
                {unit} {Number(value).toLocaleString('es-AR')}
              </span>
            ) : (
              <span className="text-3xl font-bold text-slate-900 tracking-tight font-inter">
                {Number(value).toLocaleString('es-AR')} {unit}
              </span>
            )}

            <div className="flex items-center gap-1.5 mt-1">
              {trend == undefined ? (
                ''
              ) : trend ? (
                <div className="flex items-center gap-1 text-[13px] font-bold text-slate-600">
                  {/* Flecha a la izquierda del valor, siempre en gris */}
                  <span>{trend.isPositive ? '↑' : '↓'}</span>
                  <span>{trend.value?.toString().split('.')[0]}% </span>
                  <span className="text-[12px] text-slate-400 font-medium font-inter">
                    {description}
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-1 text-[12px] text-slate-400 font-medium font-inter">
                  <AlertCircle className="h-4 w-4" />
                  Sin datos suficientes
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

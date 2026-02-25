import { Card, CardContent } from '../common/card'

interface StatCardProps {
  title: string
  value: string
  trend?: { value: number; isPositive: boolean }
  description?: string
  icon?: React.ReactNode
}

export const StatCard = ({
  title,
  value,
  trend,
  description,
  icon,
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
            <span className="text-3xl font-bold text-slate-900 tracking-tight font-inter">
              {value}
            </span>

            <div className="flex items-center gap-1.5 mt-1">
              {trend && (
                <div className="flex items-center text-[13px] font-bold text-slate-600">
                  {/* Flecha a la izquierda del valor, siempre en gris */}
                  <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
                  <span>{trend.value}%</span>
                </div>
              )}
              {/* Descripción complementaria */}
              <span className="text-[12px] text-slate-400 font-medium font-inter">
                {description}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

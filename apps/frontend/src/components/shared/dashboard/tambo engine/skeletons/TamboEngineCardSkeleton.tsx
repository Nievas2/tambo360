import { Card, CardContent } from '@/src/components/common/card'
import { Skeleton } from '@/src/components/common/skeleton'

const TamboEngineCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-start gap-4">
        <section className="flex flex-row items-start gap-4 w-full">
          {/* Skeleton para el Icono de Alerta (ShieldAlert) */}
          <Skeleton className="h-12 w-12 shrink-0 rounded-md" />

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-start justify-between">
              {/* Skeleton para la Fecha */}
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Skeleton para el Botón "Ver análisis" */}
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>

            <div className="flex flex-col gap-2">
              {/* Skeleton para el Título (Merma superior...) */}
              <Skeleton className="h-4 w-full max-w-70" />

              {/* Skeleton para el Lote/Producto */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </section>

        {/* Opcional: Podrías añadir un skeleton gris claro aquí 
            si quisieras simular que el área de IA también está cargando */}
      </CardContent>
    </Card>
  )
}

export default TamboEngineCardSkeleton

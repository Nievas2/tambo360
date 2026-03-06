import { Button } from '@/src/components/common/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/common/card'
import AlertCard from '@/src/components/shared/dashboard/AlertCard'
import { AlertCardSkeleton } from '@/src/components/shared/dashboard/tambo engine/skeletons/AlertCardSkeleton'
import { useAuth } from '@/src/context/AuthContext'
import { useLastsAlerts } from '@/src/hooks/alerts/useLastsAlerts'
import { Alert } from '@/src/types/alerts'
import { ShieldAlert } from 'lucide-react'

const AlertsSection = () => {
  const { user } = useAuth()
  const { data, isPending } = useLastsAlerts({
    id: user.establecimientos[0].idEstablecimiento,
  })

  return (
    <Card className="w-full max-w-none">
      <CardContent className="space-y-6 px-0">
        <CardHeader className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center gap-2 font-bold">
            <ShieldAlert className="text-white fill-red-main w-6" /> Alertas
          </CardTitle>

          <Button variant="ghost" size="sm">
            Ver todas
          </Button>
        </CardHeader>

        <section className="flex flex-col gap-4">
          {isPending ? (
            <>
              <AlertCardSkeleton />
              <AlertCardSkeleton />
            </>
          ) : data?.length > 0 ? (
            data?.map((alert: Alert) => (
              <AlertCard alert={alert} key={alert.id} />
            ))
          ) : (
            <CardContent className="bg-[#eaeaea] rounded-lg space-y-4 p-4">
              <p className="text-[14px]">
                Hola <b>{user.nombre.split(' ')[0]}</b>, soy TamboEngine.
              </p>
              <p className="text-[14px]">
                Analizare tu producción en búsqueda de anomalías, tendencias de
                mermas y oportunidades de optimización una vez que comiences a
                cargar datos.
              </p>
            </CardContent>
          )}
        </section>
      </CardContent>
    </Card>
  )
}
export default AlertsSection

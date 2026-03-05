import { Button } from '@/src/components/common/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/common/card'
import AlertCard from '@/src/components/shared/dashboard/AlertCard'
import { useAuth } from '@/src/context/AuthContext'
import { useLastsAlerts } from '@/src/hooks/alerts/useLastsAlerts'
import { Alert } from '@/src/types/alerts'
import { ShieldAlert } from 'lucide-react'

const AlertsSection = () => {
  const { user } = useAuth()
  /* const { data, isPending } = useLastsAlerts({
    id: user.establecimientos[0].idEstablecimiento,
  }) */

  const alerts = [
    {
      id: '1a51b7e5-f868-4e7e-852d-13fe3552fae6',
      idEstablecimiento: '07356209-e6de-4232-b24c-60ea772b11f7',
      idLote: 'lote-desvio-alto-3',
      producto: 'Queso Cremoso',
      categoria: 'quesos',
      nivel: 'alto',
      descripcion:
        'La merma real de 7.81 kg supera en 50.0% el promedio de la categoría quesos (5.21 kg). El desvío se considera alto.',
      creado_en: '2026-03-05T00:07:36.839148',
    },
    {
      id: 'a2d28d1a-02cd-4d51-83e7-addbd9bee2f8',
      idEstablecimiento: '07356209-e6de-4232-b24c-60ea772b11f7',
      idLote: 'lote-desvio-medio-2',
      producto: 'Queso Cremoso',
      categoria: 'quesos',
      nivel: 'medio',
      descripcion:
        'La merma real de 5.42 kg supera en 4.1% el promedio de la categoría quesos (5.21 kg). El desvío se considera medio.',
      creado_en: '2026-03-05T00:07:36.839143',
    },
  ]

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
          {alerts.length > 0 ? (
            alerts.map((alert: Alert) => (
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

import { Button } from '@/src/components/common/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/common/card'
import AlertCard from '@/src/components/shared/dashboard/AlertCard'
import { useAuth } from '@/src/context/AuthContext'
import { CircleAlert } from 'lucide-react'

const AlertsSection = () => {
  const { user } = useAuth()
  return (
    <Card className="w-full md:max-w-72 max-w-none">
      <CardHeader className="flex items-center justify-between w-full">
        <CardTitle className="flex items-center gap-2 font-bold">
          <CircleAlert /> Alertas
        </CardTitle>

        <Button variant="ghost" size="sm">
          Ver todas
        </Button>
      </CardHeader>

      {/* Cuando no hay alertas */}
      <CardContent className="bg-[#eaeaea] rounded-lg space-y-4 mx-4 p-4">
        <p className="text-[14px]">
          Hola <b>{user.nombre.split(' ')[0]}</b>, soy TamboEngine.
        </p>
        <p className="text-[14px]">
          Analizare tu producción en búsqueda de anomalías, tendencias de mermas
          y oportunidades de optimización una vez que comiences a cargar datos.
        </p>
      </CardContent>

      <AlertCard />
    </Card>
  )
}
export default AlertsSection

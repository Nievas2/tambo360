import { Button } from '@/src/components/common/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/common/card'
import { Alert } from '@/src/types/alerts'
import { History, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AlertCardProps {
  alert: Alert
}
const AlertCard = ({ alert }: AlertCardProps) => {
  const loteDisplay = `#${String(alert.numeroLote).padStart(3, '0')}`
  return (
    <Card className="bg-alert-bg mx-4 rounded-lg gap-4">
      <CardHeader className="space-y-1">
        <CardTitle className="font-bold text-[16px]">
          Merma superior al promedio en {alert.producto}
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span className="flex gap-2 text-xs">
            <History className="size-3" />{' '}
            {new Date(alert.creado_en)
              .toLocaleString('es-ES', {
                month: 'long',
                year: 'numeric',
              })
              .replace(/^\w/, (c) => c.toUpperCase())}
          </span>

          <span className="flex gap-2 text-xs">
            <Package className="size-3" /> {loteDisplay}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 mx-4 p-1">
        <p>{alert.descripcion}</p>
      </CardContent>

      <CardFooter className="justify-between gap-2 w-full">
        <Button className="flex-1" asChild>
          <Link to={`/tambo-engine/#${alert.id}`}>Ver alerta</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link to={`/produccion/lote/${alert.idLote}`}>Ver lote</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
export default AlertCard
